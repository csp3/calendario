'option explicit'
let lafecha = new Date();
let secCalendario = document.getElementById('secCalendario'); 
let tablaNombresMesSemana = document.createElement('table'); 
let tablaDiasCalendario = document.createElement('table');
let oscu = document.createElement('div'); 
let clar = document.createElement('div'); 
let trm;
let tdm; 
let tr1; 
let tr2;
let td1;
let td2; 
let tipocolor = 'claro'; 
 
creartablaNombresMesSemana(); 
crearTablaDiasCalendario(); 
 
let mes = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SETIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
let numdias = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

let mesa = lafecha.getMonth();
let anioa = lafecha.getFullYear();

document.getElementById("calAnterior").addEventListener("click", mesAnterior, false);
document.getElementById("calSiguiente").addEventListener("click", mesSiguiente,  false);

/**nombre del mes*/
function nombreMes(mesa) 
{ 
	document.getElementById('idmes').innerHTML = mes[mesa] + " del " + anioa;
}

/**llenar con dias el calendario*/
function llenarDiasEnCalendario(mesa, anioa) 
{
	//anio bisiesto para numdias
	(anioa % 4 == 0) ? numdias[1] = 29 : numdias[1] = 28;
	//nombres de mes-anio
	nombreMes(mesa);

	let fil = 0, filacolumna;
	for (let i = 1; i <= numdias[mesa]; i++) 
	{
		let d1 = new Date(anioa + "/" + (mesa + 1) + "/" + i);
		if (!isNaN(d1)) 
		{
			filacolumna = tablaDiasCalendario.rows[fil].cells[d1.getDay()]; 
			filacolumna.innerHTML = d1.getDate() + filacolumna.innerHTML; 

			if (lafecha.getDate() == filacolumna.innerHTML) 
				filacolumna.style.background = '#efff68';
			else 
				filacolumna.style.background = 'transparent';
		}
		//saltar otra fila
		((d1.getDay() + 1) % 7 == 0) ? fil++ : fil = fil;
	}
}

/**ir al mes anterior*/
function mesAnterior() 
{
	limpiarTabla();
	//si llega a enero y retrocede
	if (mesa > 0) 
		mesa = mesa - 1;
	else 
	{
		mesa = 11;
		anioa = anioa - 1;
	}
	
	llenarDiasEnCalendario(mesa, anioa);

	if(tipocolor == 'oscuro')
		pintaDiaActual('#966666');
	else 
		pintaDiaActual('#efff68');
}

/**ir al mes siguiente*/
function mesSiguiente()  
{
	limpiarTabla();
	//si llega a diciembre y sigue
	if (mesa + 1 < 12) 
		mesa = mesa + 1;
	else 
	{
		mesa = 0;
		anioa = anioa + 1;
	}

	llenarDiasEnCalendario(mesa, anioa);
	
	if(tipocolor == 'oscuro')
		pintaDiaActual('#966666');
	else 
		pintaDiaActual('#efff68');
}

/**limpiar tabla*/
function limpiarTabla() 
{
	for (i = 0; i < 6; i++) 
	{
		for (j = 0; j < 7; j++) 
		{
			tablaDiasCalendario.rows[i].cells[j].innerHTML = "";
		}
	}
}

/**crear tabla con Dias de Calendario*/
function crearTablaDiasCalendario()
{
	tablaDiasCalendario.id = 'tablaDiasCalendario';
	tablaDiasCalendario.className = 'tablaDiasCalendario'; 
	for (let i = 0; i < 7; i++) 
	{	
		trm = document.createElement('tr');
		trm.classList.add('filasemana');
		tablaDiasCalendario.appendChild(trm); 
		if(i == 6)
		{
			tdm = document.createElement('td');
			tdm.colSpan = '7'; 
			tdm.addEventListener('click', function(){
				mostrarFecha(this.innerHTML);
			}); 
			trm.appendChild(tdm);  
		}
		else
		{
			for (let j = 0; j < 7; j++) 
			{
				tdm = document.createElement('td'); 
				tdm.addEventListener('click', function(){
					mostrarFecha(this.innerHTML);
				}); 
				trm.appendChild(tdm); 
			}
		}
	}
	secCalendario.appendChild(tablaDiasCalendario); 
}

/**mostrar fecha*/ 
function mostrarFecha(dia)
{
	let fechaaux = new Date(); 
	let hora = fechaaux.getHours();
	let minuto = fechaaux.getMinutes(); 
	let verhora = ''; 

	if(hora > 12)
	{
		hora = hora - 12;
		verhora = hora + ":" + minuto + " pm"; 
	}
	else
	{
		if(hora == 0)
			hora = 12; 
		else 
		{
			if(hora < 10)
				hora = "0" + hora;
		}
		verhora =  hora + ":" + minuto + " am"; 
	} 

	tablaDiasCalendario.rows[6].cells[0].innerHTML = dia + " de " + document.getElementById('idmes').innerHTML + ' - ' + verhora;  
}

/**crer tabla tabla con Nombres de Mes y Semana*/
function creartablaNombresMesSemana() 
{
	tablaNombresMesSemana.id = 'tablaNombresMesSemana';
	tablaNombresMesSemana.className = 'tablaNombresMesSemana'; 
	
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
	
	tablaNombresMesSemana.appendChild(tr1);
	tablaNombresMesSemana.appendChild(tr2); 
	secCalendario.appendChild(tablaNombresMesSemana); 
}

/**pintar calendario en modo oscuro */
oscu.addEventListener('click', function() { 
	pintaTabla('#7a6a7a','#fff','#888777');  
	tipocolor = 'oscuro';
	pintaDiaActual('#966666');
}); 

/**pintar calendario en modo claro */
clar.addEventListener('click', function() { 
	pintaTabla('#fff', '#000', '#f7f7d5'); 
	tipocolor = 'claro'; 
	pintaDiaActual('#efff68'); 
}); 

/**pintar tabla*/
function pintaTabla(col1, col2, col3) 
{
	tablaNombresMesSemana.style.backgroundColor = col1; 
	tablaDiasCalendario.style.backgroundColor = col1; 
	tablaNombresMesSemana.style.color = col2; 
	tablaDiasCalendario.style.color = col2; 
	calAnterior.style.backgroundColor = col3;
	calSiguiente.style.backgroundColor = col3; 
	for (let i = 0; i < 7; i++) 
	{
		tablaNombresMesSemana.rows[1].cells[i].style.backgroundColor = col3; 	
	} 
}

/**pintar el dia actual*/
function pintaDiaActual(col)
{
	for (let i = 1; i < 6; i++) 
	{
		for (let j = 0; j < 7; j++) 
		{			
			if (tablaDiasCalendario.rows[i].cells[j].innerHTML == lafecha.getDate()) 
				tablaDiasCalendario.rows[i].cells[j].style.backgroundColor = col; 
			else 
				tablaDiasCalendario.rows[i].cells[j].style.backgroundColor = 'transparent'; 
		}
	}
}

/** llenado el calendario con dias*/ 
llenarDiasEnCalendario(mesa, anioa);
