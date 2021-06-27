'option explicit'
var ladate = new Date();
var secCalendario = document.getElementById('secCalendario'); 
var tablaCal = document.createElement('table'); 
var tablaCalMos = document.createElement('table');
var trm;
var tdm; 
var tr1; 
var tr2;
var td1;
var td2; 
var tipocolor = 'claro'; 

var oscu = document.createElement('div'); 
var clar = document.createElement('div'); 

// 
crearTablaCal(); 
crearTablaCalMos(); 
// 
mes = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SETIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
numdias = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

mesa = ladate.getMonth();
anioa = ladate.getFullYear();

document.getElementById("calAnterior").addEventListener("click", mesAntes, false);
document.getElementById("calSiguiente").addEventListener("click", mesSigue, false);

function nombreMes(mesa) 
{ 
	document.getElementById('idmes').innerHTML = mes[mesa] + " - " + anioa;
}

function calcular(mesa, anioa) 
{
	//anio bisiesto para numdias
	(anioa % 4 == 0) ? numdias[1] = 29 : numdias[1] = 28;
	//nombres de mes-anio
	nombreMes(mesa);

	var fil = 0, di = "", filcol;
	for (let i = 1; i <= numdias[mesa]; i++) 
	{
		(i < 10) ? di = "0" + i : di = "" + i;
		var d1 = new Date(anioa + "/" + (mesa + 1) + "/" + di);
		if (!isNaN(d1)) 
		{
			filcol = tablaCalMos.rows[fil].cells[d1.getDay()];
			filcol.innerHTML = d1.getDate() + filcol.innerHTML;

			if (ladate.getDate() == filcol.innerHTML) 
			{
				filcol.style.background = '#efff68';
			}
			else 
			{
				filcol.style.background = 'transparent';
			}
		}
		//saltar otra fila
		((d1.getDay() + 1) % 7 == 0) ? fil++ : fil = fil;
	}
}

function mesAntes() 
{
	limpiarTabla();
	//si llega a enero y retrocede
	if (mesa > 0) 
	{
		mesa = mesa - 1;
	}
	else 
	{
		mesa = 11;
		anioa = anioa - 1;
	}
	
	calcular(mesa, anioa);

	if(tipocolor == 'oscuro')
		pintacol('#966666');
	else 
		pintacol('#efff68');
}

function mesSigue() 
{
	limpiarTabla();
	//si llega a diciembre y sigue
	if (mesa + 1 < 12) 
	{
		mesa = mesa + 1;
	}
	else 
	{
		mesa = 0;
		anioa = anioa + 1;
	}

	calcular(mesa, anioa);
	
	if(tipocolor == 'oscuro')
		pintacol('#966666');
	else 
		pintacol('#efff68');
}

function limpiarTabla() 
{
	for (i = 0; i < 6; i++) 
	{
		for (j = 0; j < 7; j++) 
		{
			tablaCalMos.rows[i].cells[j].innerHTML = "";
		}
	}
}

// crear tabla tablaCalMos
function crearTablaCalMos()
{
	tablaCalMos.id = 'tablaCalMos';
	tablaCalMos.className = 'tablaCalMos'; 
	for (let i = 0; i < 6; i++) 
	{	
		trm = document.createElement('tr');
		trm.classList.add('filasem');
		tablaCalMos.appendChild(trm); 
		for (let j = 0; j < 7; j++) 
		{
			tdm = document.createElement('td'); 
			trm.appendChild(tdm); 
		}
	}
	secCalendario.appendChild(tablaCalMos); 
}

// crer tabla tablacal
function crearTablaCal() 
{
	tablaCal.id = 'tablacal';
	tablaCal.className = 'tablacal'; 
	tr1 = document.createElement('tr'); 
	td1 = document.createElement('td'); 
	td1.colSpan = 7; 
	divcalAnterior = document.createElement('div'); 
	divcalAnterior.id = 'calAnterior';
	divcalAnterior.className = 'calAnterior';  
	divcalAnterior.innerHTML = '⇠'; 
	dividmes = document.createElement('div'); 
	dividmes.id = 'idmes';
	dividmes.className = 'idmes'; 
	dividmes.innerHTML = 'mes';
	divcalSiguiente = document.createElement('div'); 
	divcalSiguiente.id = 'calSiguiente'; 
	divcalSiguiente.className = 'calSiguiente'; 
	divcalSiguiente.innerHTML = '⇢';

	oscu.innerHTML = '»';
	oscu.classList.add('denoche');  
	clar.innerHTML = '«';
	clar.classList.add('dedia'); 
	
	td1.appendChild(oscu); 
	td1.appendChild(divcalAnterior);
	td1.appendChild(dividmes); 
	td1.appendChild(divcalSiguiente); 
	td1.appendChild(clar); 
	tr1.appendChild(td1); 
	tr2 = document.createElement('tr');
	let diascd = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']; 
	for (let i = 0; i < 7; i++) 
	{
		td2 = document.createElement('td'); 
		td2.classList.add('classdia'); 
		td2.innerHTML = diascd[i]; 
		tr2.appendChild(td2); 
	}
	tablaCal.appendChild(tr1);
	tablaCal.appendChild(tr2); 
	secCalendario.appendChild(tablaCal); 
}

// 
calcular(mesa, anioa);

//
oscu.addEventListener('click', function() { 
	pintatabla('#7a6a7a','#fff','#888777');  
	tipocolor = 'oscuro';
	pintacol('#966666');
}); 

clar.addEventListener('click', function() { 
	pintatabla('#fff', '#000', '#f7f7d5'); 
	tipocolor = 'claro'; 
	pintacol('#efff68'); 
}); 
//
function pintatabla(col1, col2, col3) 
{
	tablaCal.style.backgroundColor = col1; 
	tablaCalMos.style.backgroundColor = col1; 
	tablaCal.style.color = col2; 
	tablaCalMos.style.color = col2; 
	calAnterior.style.backgroundColor = col3;
	calSiguiente.style.backgroundColor = col3; 
	for (let i = 0; i < 7; i++) 
	{
		tablaCal.rows[1].cells[i].style.backgroundColor = col3; 	
	}	
}
//
function pintacol(col)
{
	for (let i = 1; i < 6; i++) 
	{
		for (let j = 0; j < 7; j++) 
		{			
			if (tablaCalMos.rows[i].cells[j].innerHTML == ladate.getDate()) 
			{
				tablaCalMos.rows[i].cells[j].style.backgroundColor = col; 
			}
			else 
			{
				tablaCalMos.rows[i].cells[j].style.backgroundColor = 'transparent'; 
			}
		}
	}
}