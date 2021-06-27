'option explicit'
var d = new Date();
var secCalendario = document.getElementById('secCalendario'); 
var tablaCal = document.createElement('table'); 
var tablaCalMos = document.createElement('table');
var trm;
var tdm; 
// 
crearTablaCal(); 
crearTablaCalMos(); 
// 
mes = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SETIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
numdias = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

mesa = d.getMonth();
anioa = d.getFullYear();

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
	for (i = 1; i <= numdias[mesa]; i++) 
	{
		(i < 10) ? di = "0" + i : di = "" + i;
		var d1 = new Date(anioa + "/" + (mesa + 1) + "/" + di);
		if (!isNaN(d1)) 
		{
			filcol = tablaCalMos.rows[fil].cells[d1.getDay()];
			filcol.innerHTML = d1.getDate() + filcol.innerHTML;

			if (d.getDate() == filcol.innerHTML) 
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
	var tr1 = document.createElement('tr'); 
	var td1 = document.createElement('td'); 
	td1.colSpan = 7; 
	divcalAnterior = document.createElement('div'); 
	divcalAnterior.id = 'calAnterior';
	divcalAnterior.innerHTML = '⇠'; 
	dividmes = document.createElement('div'); 
	dividmes.id = 'idmes';
	dividmes.innerHTML = 'mes';
	divcalSiguiente = document.createElement('div'); 
	divcalSiguiente.id = 'calSiguiente';
	divcalSiguiente.innerHTML = '⇢';
	td1.appendChild(divcalAnterior);
	td1.appendChild(dividmes); 
	td1.appendChild(divcalSiguiente); 
	tr1.appendChild(td1); 
	var tr2 = document.createElement('tr');
	var diascd = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']; 
	for (let i = 0; i < 7; i++) 
	{
		var td2 = document.createElement('td'); 
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
