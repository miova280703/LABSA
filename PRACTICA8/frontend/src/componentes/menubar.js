import * as React from 'react';
import axios from 'axios';
import { styled, alpha } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, orange } from '@mui/material/colors';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Modal from '@mui/material/Modal';

import TextField from '@mui/material/TextField';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import globlals from '../utils/global';


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


const theme = createTheme({
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: grey[400],
        },
        secondary: {
            // This is green.A700 as hex.
            main: '#145369',
        },
        hola: {
            main: orange[500],
        }
    },
});

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.85),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.55),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


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

const style1 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

// const AGREGAR_CARROS = `http://localhost:5000/crearCarro`
// const AGREGAR_REGISTRO = `http://localhost:5000/guardarActividad`
const AGREGAR_CARROS = `http://${globlals.hostPrincipal}:5000/crearCarro`
const AGREGAR_REGISTRO = `http://${globlals.hostPrincipal}:5000/guardarActividad`
var tiempo = new Date()
var ahora =tiempo.toLocaleString()

export default function BarMenu() {
    //REGISTRO DE CARROS
    const [placaCarro, setPlacaCarro] = React.useState("")
    const [marcaCarro, setMarcaCarro] = React.useState("")
    const [modeloCarro, setModeloCarro] = React.useState("")
    const [serieCarro, setSerieCarro] = React.useState("")
    const [colorCarro, setColorCarro] = React.useState("")

    async function RegistrarCarro() {
        console.log("placa: " + placaCarro)
        console.log("marca: " + marcaCarro)
        console.log("modelo: " + modeloCarro)
        console.log("serie: " + serieCarro)
        console.log("color: " + colorCarro)

        const nuevo_carro = {
            placa: placaCarro,
            marca: marcaCarro,
            modelo: modeloCarro,
            serie: serieCarro,
            color: colorCarro
        };

        axios.post(AGREGAR_CARROS, nuevo_carro, {
            Headers: {
                'Content-Type': 'application/json'
            }
        }
        ).then((res) => {
            console.log(res)
        })

        const nuevo_registro = {
            func:"Crear",
            time:ahora
        }

        axios.post(AGREGAR_REGISTRO, nuevo_registro, {
            Headers: {
                'Content-Type': 'application/json'
            }
        }
        ).then((res) => {
            console.log(res)
        })
    }

    //FILTRO BUSQUEDA
    const [filasBuscar, setFilasBuscar] = React.useState([]);
    const [buscar, setBuscar] = React.useState("");
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const [openFiltrar, setOpenFiltrar] = React.useState(false);
    // const handleOpenFiltrar = () => setOpenFiltrar(true);
    const handleCloseFiltrar = () => setOpenFiltrar(false);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    async function filtrarBusqueda() {

        console.log("filtro: " + age)
        console.log("buscar: " + buscar)

        if (age === 10) {
            // const FILTRAR_CARRO_MARCA = `http://localhost:5000/filtrarCarroMarca/${buscar}`
            const FILTRAR_CARRO_MARCA = `http://${globlals.hostPrincipal}:5000/filtrarCarroMarca/${buscar}`
            axios.get(FILTRAR_CARRO_MARCA, {}, {
                Headers: {
                    'Content-Type': 'application/json'
                }
            }
            ).then((res) => {
                console.log(res.data)
                setFilasBuscar(res.data)
            })
            setOpenFiltrar(true);
        } else if (age === 20) {
            // const FILTRAR_CARRO_MODELO = `http://localhost:5000/filtrarCarroModelo/${buscar}`
            const FILTRAR_CARRO_MODELO = `http://${globlals.hostPrincipal}:5000/filtrarCarroModelo/${buscar}`
            axios.get(FILTRAR_CARRO_MODELO, {}, {
                Headers: {
                    'Content-Type': 'application/json'
                }
            }
            ).then((res) => {
                console.log(res.data)
                setFilasBuscar(res.data)
            })
            setOpenFiltrar(true);
        } else if (age === 30) {
            // const FILTRAR_CARRO_COLOR = `http://localhost:5000/filtrarCarroColor/${buscar}`
            const FILTRAR_CARRO_COLOR = `http://${globlals.hostPrincipal}:5000/filtrarCarroColor/${buscar}`
            axios.get(FILTRAR_CARRO_COLOR, {}, {
                Headers: {
                    'Content-Type': 'application/json'
                }
            }
            ).then((res) => {
                console.log(res.data)
                setFilasBuscar(res.data)
            })
            setOpenFiltrar(true);
        } else {
            alert("debe de seleccionar un filtro")
        }
    }

    return (

        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar >
                        <Button variant="contained" color="secondary" onClick={handleOpen}>AGREGAR</Button>

                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    AGREGAR CARRO
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    LLENA ESTE FORMULARIO PARA AGREGAR UN NUEVO CARRO.
                                </Typography> <br /><br />
                                Ingrese placa del carro: <br />
                                <TextField id="standard-basic" label="PLACA" variant="standard" onChange={event => setPlacaCarro(event.target.value)} />
                                <br /><br />
                                Ingrese marca del carro:<br />
                                <TextField id="standard-basic" label="MARCA" variant="standard" onChange={event => setMarcaCarro(event.target.value)} />
                                <br /><br />
                                Ingrese modelo del carro:<br />
                                <TextField id="standard-basic" label="MODELO" variant="standard" onChange={event => setModeloCarro(event.target.value)} />
                                <br /><br />
                                Ingrese serie del carro:<br />
                                <TextField id="standard-basic" label="SERIE" variant="standard" onChange={event => setSerieCarro(event.target.value)} />
                                <br /><br />
                                Ingrese color del carro:<br />
                                <TextField id="standard-basic" label="COLOR" variant="standard" onChange={event => setColorCarro(event.target.value)} />
                                <br /><br />
                                <Button variant="contained" color="secondary" onClick={RegistrarCarro} >GUARDAR</Button>
                            </Box>
                        </Modal>

                        <Typography
                            variant="h6"
                            color="secondary"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            PRACTICA8 SA VJ2023
                        </Typography>

                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <InputLabel id="demo-select-small">FILTRO</InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={age}
                                label="Age"
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>MARCA</MenuItem>
                                <MenuItem value={20}>MODELO</MenuItem>
                                <MenuItem value={30}>COLOR</MenuItem>
                            </Select>
                        </FormControl>

                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={event => setBuscar(event.target.value)}
                            />
                        </Search> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button variant="contained" color="secondary" onClick={filtrarBusqueda}>BUSCAR</Button>
                    </Toolbar>
                </AppBar>
            </Box>

            <Modal
                open={openFiltrar}
                onClose={handleCloseFiltrar}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style1}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        RESULTADO DE LA BUSQUEDA DE CARRO
                    </Typography><br />
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
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filasBuscar.map((row, index) => (
                                    <StyledTableRow key={row.id}>
                                        <StyledTableCell align="center">{index + 1}</StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            {row.placa}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{row.marca}</StyledTableCell>
                                        <StyledTableCell align="center">{row.modelo}</StyledTableCell>
                                        <StyledTableCell align="center">{row.serie}</StyledTableCell>
                                        <StyledTableCell align="center">{row.color}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Modal>

        </ThemeProvider>
    );
}