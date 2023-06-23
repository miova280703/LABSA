import * as React from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import { Box } from '@mui/material';

import Modal from '@mui/material/Modal';

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import globlals from '../utils/global';

// import datos from '../data_prueba/info_tabla.json'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


// const RECIBIR_CARROS = `http://localhost:5000/obtenerCarros`
// const GUARDAR_REGISTRO = `http://localhost:5000/guardarActividad`
const RECIBIR_CARROS = `http://${globlals.hostPrincipal}:5000/obtenerCarros`
const GUARDAR_REGISTRO = `http://${globlals.hostPrincipal}:5000/guardarActividad`

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


var tiempos = new Date()
var ahoras =tiempos.toLocaleString()

export default function TablaCarros() {
    //LLENAR TABLA
    const [filas, setFilas] = React.useState([])

    async function LlenarTablaCarros() {
        axios.get(RECIBIR_CARROS, {}, {
            Headers: {
                'Content-Type': 'application/json'
            }
        }
        ).then((res) => {
            console.log(res.data)
            setFilas(res.data)
        })
    }

    //MODAL MODIFICAR
    const [openModificar, setOpenModificar] = React.useState(false);
    // const handleOpen = () => setOpenModificar(true);
    const handleCloseModificar = () => setOpenModificar(false);

    const [idCarroModificar, setIdCarroModificar] = React.useState("")
    const [placaCarroModificar, setPlacaCarroModificar] = React.useState("")
    const [marcaCarroModificar, setMarcaCarroModificar] = React.useState("")
    const [modeloCarroModificar, setModeloCarroMofidicar] = React.useState("")
    const [serieCarroModificar, setSerieCarroModificar] = React.useState("")
    const [colorCarroModificar, setColorCarroModificar] = React.useState("")

    const buscar_modificar = (n) => {
        console.log("index: " + n)
        setIdCarroModificar(filas[n].id)
        setPlacaCarroModificar(filas[n].placa)
        setMarcaCarroModificar(filas[n].marca)
        setModeloCarroMofidicar(filas[n].modelo)
        setSerieCarroModificar(filas[n].serie)
        setColorCarroModificar(filas[n].color)
        setOpenModificar(true);
    }

    // const EDITAR_CARROS = `http://localhost:5000/edtiarCarro/${idCarroModificar}`
    const EDITAR_CARROS = `http://${globlals.hostPrincipal}:5000/edtiarCarro/${idCarroModificar}`

    async function modificarCarro() {
        console.log("placa: " + placaCarroModificar)
        console.log("marca: " + marcaCarroModificar)
        console.log("modelo: " + modeloCarroModificar)
        console.log("serie: " + serieCarroModificar)
        console.log("color: " + colorCarroModificar)

        const carro_editado = {
            placa: placaCarroModificar,
            marca: marcaCarroModificar,
            modelo: modeloCarroModificar,
            serie: serieCarroModificar,
            color: colorCarroModificar
        };

        axios.put(EDITAR_CARROS, carro_editado, {
            Headers: {
                'Content-Type': 'application/json'
            }
        }
        ).then((res) => {
            console.log(res)
        })

        const nuevo_registro = {
            func:"Modificar",
            time:ahoras
        }

        axios.post(GUARDAR_REGISTRO, nuevo_registro, {
            Headers: {
                'Content-Type': 'application/json'
            }
        }
        ).then((res) => {
            console.log(res)
        })
    }

    //MODAL ELIMINAR
    const [openEliminar, setOpenEliminar] = React.useState(false);
    // const handleOpenEliminar = () => setOpenEliminar(true);
    const handleCloseEliminar = () => setOpenEliminar(false);
    const [idCarroEliminar, setIdCarroEliminar] = React.useState("")

    const buscar_eliminar = (n) => {
        console.log("index: " + n)
        setIdCarroEliminar(filas[n].id)
        setOpenEliminar(true);
    }
    // const ELIMINAR_CARROS = `http://localhost:5000/eliminarCarro/${idCarroEliminar}`
    const ELIMINAR_CARROS = `http://${globlals.hostPrincipal}:5000/eliminarCarro/${idCarroEliminar}`

    async function eliminarCarro() {

        axios.delete(ELIMINAR_CARROS, {}, {
            Headers: {
                'Content-Type': 'application/json'
            }
        }
        ).then((res) => {
            console.log(res)
        })

        const nuevo_registro = {
            func:"Eliminar",
            time:ahoras
        }

        axios.post(GUARDAR_REGISTRO, nuevo_registro, {
            Headers: {
                'Content-Type': 'application/json'
            }
        }
        ).then((res) => {
            console.log(res)
        })
    }


    React.useEffect(() => {
        LlenarTablaCarros()
    }, []);

    return (
        <div align='center'>

            <Box sx={{ width: 900, height: 800, backgroundColor: 'primary', justifyContent: 'center' }}>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">NO.</StyledTableCell>
                                <StyledTableCell align="center">PLACA</StyledTableCell>
                                <StyledTableCell align="center">MARCA</StyledTableCell>
                                <StyledTableCell align="center">MODELO</StyledTableCell>
                                <StyledTableCell align="center">SERIE</StyledTableCell>
                                <StyledTableCell align="center">COLOR</StyledTableCell>
                                <StyledTableCell align="center">ACCIONES</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filas.map((row, index) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell align="center">{index + 1}</StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        {row.placa}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.marca}</StyledTableCell>
                                    <StyledTableCell align="center">{row.modelo}</StyledTableCell>
                                    <StyledTableCell align="center">{row.serie}</StyledTableCell>
                                    <StyledTableCell align="center">{row.color}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Button onClick={() => buscar_modificar(index)}>MODIFICAR </Button>
                                        <Button onClick={() => buscar_eliminar(index)}>ELIMINAR</Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Modal
                open={openModificar}
                onClose={handleCloseModificar}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        MODIFICAR CARRO
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        MODIFICA O ACTUALIZA LA INFORMACION DEL CARRO CON ESTE FORMULARIO.
                    </Typography> <br /><br />
                    Ingrese placa del carro: <br />
                    <TextField id="standard-basic" label="PLACA" variant="standard" defaultValue={placaCarroModificar} onChange={event => setPlacaCarroModificar(event.target.value)} />
                    <br /><br />
                    Ingrese marca del carro:<br />
                    <TextField id="standard-basic" label="MARCA" variant="standard" defaultValue={marcaCarroModificar} onChange={event => setMarcaCarroModificar(event.target.value)} />
                    <br /><br />
                    Ingrese modelo del carro:<br />
                    <TextField id="standard-basic" label="MODELO" variant="standard" defaultValue={modeloCarroModificar} onChange={event => setModeloCarroMofidicar(event.target.value)} />
                    <br /><br />
                    Ingrese serie del carro:<br />
                    <TextField id="standard-basic" label="SERIE" variant="standard" defaultValue={serieCarroModificar} onChange={event => setSerieCarroModificar(event.target.value)} />
                    <br /><br />
                    Ingrese color del carro:<br />
                    <TextField id="standard-basic" label="COLOR" variant="standard" defaultValue={colorCarroModificar} onChange={event => setColorCarroModificar(event.target.value)} />
                    <br /><br />
                    <Button variant="contained" color="primary" onClick={modificarCarro} >GUARDAR</Button>
                </Box>
            </Modal>

            <Modal
                open={openEliminar}
                onClose={handleCloseEliminar}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        ELIMINAR CARRO
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        ESTA SEGURO DE ELIMINAR EL CARRO.
                    </Typography> <br /><br />

                    <Button variant="contained" color="primary" onClick={eliminarCarro} >ACEPTAR</Button>
                </Box>
            </Modal>
        </div>

    );
}