package main

import (
	"context"
	"log"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type MongoInstance struct {
	Client *mongo.Client
	Db     *mongo.Database
}

var mg MongoInstance

const dbName = "Carros"

type Carros struct {
	Id     string `json:"id,omitempty" bson:"_id,omitempty"`
	Placa  string `json:"placa"`
	Marca  string `json:"marca"`
	Modelo string `json:"modelo"`
	Serie  string `json:"serie"`
	Color  string `json:"color"`
}

type Registros struct {
	Iden string `json:"id,omitempty" bson:"_id,omitempty"`
	Func string `json:"func"`
	Time string `json:"time"`
}

func Conexion() error {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error al leer variable de entorno")
	}
	port := os.Getenv("DB_PORT")
	var mongoURL = "mongodb://" + port + ":27017/" + dbName
	client, err := mongo.NewClient(options.Client().ApplyURI(mongoURL))

	if err != nil {
		log.Fatal(err)
	}

	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)
	// defer cancel()

	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
	db := client.Database(dbName)

	mg = MongoInstance{
		Client: client,
		Db:     db,
	}
	return nil
}

func main() {
	//CONEXION A LA BASE DE DATOS
	if err := Conexion(); err != nil {
		log.Fatal(err)
	}
	//CONFIGURACION DEL SERVIDOR
	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
	}))

	//RUTA PARA OBTENER TODOS LOS AUTOS DE LA BASE DE DATOS
	app.Get("/obtenerCarros", func(c *fiber.Ctx) error {
		query := bson.D{{}}

		cursor, err := mg.Db.Collection("car").Find(c.Context(), query)

		if err != nil {
			return c.Status(500).SendString(err.Error())
		}

		var carrito []Carros = make([]Carros, 0)

		if err := cursor.All(c.Context(), &carrito); err != nil {
			return c.Status(500).SendString(err.Error())
		}

		// fmt.Println(c.JSON(carrito))
		return c.JSON(carrito)
	})

	//METODO PARA INSERTAR UN CARRO
	app.Post("/crearCarro", func(c *fiber.Ctx) error {
		collection := mg.Db.Collection("car")

		cars := new(Carros)
		if err := c.BodyParser(cars); err != nil {
			return c.Status(400).SendString(err.Error())
		}

		cars.Id = ""

		resultadoInsertar, err := collection.InsertOne(c.Context(), cars)

		if err != nil {
			return c.Status(500).SendString(err.Error())
		}

		filtro := bson.D{{Key: "_id", Value: resultadoInsertar.InsertedID}}
		createdRecord := collection.FindOne(c.Context(), filtro)

		carroCreado := &Carros{}
		createdRecord.Decode(carroCreado)

		return c.Status(201).JSON(carroCreado)

	})

	//METODO PARA EDITAR UN CARRO
	app.Put("/edtiarCarro/:id", func(c *fiber.Ctx) error {
		idParam := c.Params("id")

		carroID, err := primitive.ObjectIDFromHex(idParam)

		if err != nil {
			return c.SendStatus(400)
		}

		carritos := new(Carros)

		if err := c.BodyParser(carritos); err != nil {
			return c.Status(400).SendString(err.Error())
		}

		query := bson.D{{Key: "_id", Value: carroID}}
		update := bson.D{
			{Key: "$set",
				Value: bson.D{
					{Key: "placa", Value: carritos.Placa},
					{Key: "marca", Value: carritos.Marca},
					{Key: "modelo", Value: carritos.Modelo},
					{Key: "serie", Value: carritos.Serie},
					{Key: "color", Value: carritos.Color},
				},
			},
		}

		err = mg.Db.Collection("car").FindOneAndUpdate(c.Context(), query, update).Err()

		if err != nil {
			if err == mongo.ErrNoDocuments {
				return c.SendStatus(400)
			}
			return c.SendStatus(500)
		}

		carritos.Id = idParam

		return c.Status(200).JSON(carritos)

	})

	//METODO PARA ELIMINAR UN CARRO
	app.Delete("/eliminarCarro/:id", func(c *fiber.Ctx) error {

		carroId, err := primitive.ObjectIDFromHex(c.Params("id"))

		if err != nil {
			return c.SendStatus(400)
		}

		query := bson.D{{Key: "_id", Value: carroId}}
		result, err := mg.Db.Collection("car").DeleteOne(c.Context(), &query)

		if err != nil {
			return c.SendStatus(500)
		}

		if result.DeletedCount < 1 {
			return c.SendStatus(404)
		}

		return c.Status(200).JSON("record deleted")

	})

	//METODO PARA BUSCAR CARRO POR MARCA
	app.Get("/filtrarCarroMarca/:marca", func(c *fiber.Ctx) error {
		marca := c.Params("marca")
		query := bson.D{{Key: "marca", Value: marca}}
		var carrito []Carros = make([]Carros, 0)

		cursor, err := mg.Db.Collection("car").Find(c.Context(), query)
		if err != nil {
			return c.Status(500).SendString(err.Error())
		}
		if err := cursor.All(c.Context(), &carrito); err != nil {
			return c.Status(500).SendString(err.Error())
		}
		return c.JSON(carrito)

	})

	//METODO PARA BUSCAR CARRO POR MODELO
	app.Get("/filtrarCarroModelo/:modelo", func(c *fiber.Ctx) error {
		modelo := c.Params("modelo")
		query := bson.D{{Key: "modelo", Value: modelo}}
		var carrito []Carros = make([]Carros, 0)

		cursor, err := mg.Db.Collection("car").Find(c.Context(), query)
		if err != nil {
			return c.Status(500).SendString(err.Error())
		}
		if err := cursor.All(c.Context(), &carrito); err != nil {
			return c.Status(500).SendString(err.Error())
		}
		return c.JSON(carrito)

	})

	//METODO PARA BUSCAR CARRO POR COLOR
	app.Get("/filtrarCarroColor/:color", func(c *fiber.Ctx) error {
		color := c.Params("color")
		query := bson.D{{Key: "color", Value: color}}
		var carrito []Carros = make([]Carros, 0)

		cursor, err := mg.Db.Collection("car").Find(c.Context(), query)
		if err != nil {
			return c.Status(500).SendString(err.Error())
		}
		if err := cursor.All(c.Context(), &carrito); err != nil {
			return c.Status(500).SendString(err.Error())
		}
		return c.JSON(carrito)

	})

	//METODO PARA GUARDAR LAS OPERACIONES
	app.Post("/guardarActividad", func(c *fiber.Ctx) error {
		collection := mg.Db.Collection("reg")

		regs := new(Registros)
		if err := c.BodyParser(regs); err != nil {
			return c.Status(400).SendString(err.Error())
		}

		regs.Iden = ""

		resultadoInsertar, err := collection.InsertOne(c.Context(), regs)

		if err != nil {
			return c.Status(500).SendString(err.Error())
		}

		filtro := bson.D{{Key: "_id", Value: resultadoInsertar.InsertedID}}
		createdRecord := collection.FindOne(c.Context(), filtro)

		registroCreado := &Registros{}
		createdRecord.Decode(registroCreado)

		return c.Status(201).JSON(registroCreado)

	})

	//PUERTO DEL SERVIDOR
	log.Fatal(app.Listen(":5000"))
}
