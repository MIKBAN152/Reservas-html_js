	var name="";//= document.getElementById("nombre").value;
	var nmr_id="";//document.getElementById("nmrid").value;
	var select1 = "";//document.getElementById("sel_cant_pers");
	var nmr_pers=0;//select1.options[select1.selectedIndex].text;
	var nmr_dias=0;//document.getElementById("cant_dias").value;
	var select2 = "";//document.getElementById("sel_tipo_hab");
	var hab_tipo=0;//select2.options[select2.selectedIndex].text;
	var in_fecha="";//document.getElementById("fecha_in").value;
function checkValues()
{
	name= document.getElementById("nombre").value;
	nmr_id=document.getElementById("nmrid").value;
	select1 = document.getElementById("sel_cant_pers");
	nmr_pers=select1.options[select1.selectedIndex].text;
	nmr_dias=document.getElementById("cant_dias").value;
	select2 = document.getElementById("sel_tipo_hab");
	hab_tipo=select2.options[select2.selectedIndex].text;
	in_fecha=document.getElementById("fecha_in").value;
	if(name.length == 0 || nmr_id.length == 0 || select2.selectedIndex == 0 || select1.selectedIndex == 0 || nmr_dias.length == 0 || in_fecha.length == 0)
	{
		return 1;
	}
	else
	{
		if(parseInt(nmr_dias))
		{
			return 0;
		}
		else
		{
			alert("El valor numero de dias debe ser un entero.");
			return 1;
		}
	}
}
function postReserva()
{
    /*name= document.getElementById("nombre").value;
	nmr_id=document.getElementById("nmrid").value;
	select1 = document.getElementById("sel_cant_pers");
	nmr_pers=select1.options[select1.selectedIndex].text;
	nmr_dias=document.getElementById("cant_dias").value;
	select2 = document.getElementById("sel_tipo_hab");
	hab_tipo=select2.options[select2.selectedIndex].text;
	in_fecha=document.getElementById("fecha_in").value;*/

	var _continue = checkValues();
	if (_continue==1)
	{
		alert("Por favor ingrese todos los parámetros del formulario!");
		return;
	}
	if(!name || !nmr_id)
	{
		alert("Por favor ingrese todos los parámetros del formulario!");
		return 0;
	}
    var vars = "nombre="+name+"&id_nmr="+nmr_id+"&pers_nmr="+nmr_pers+"&dias_nmr="+nmr_dias+"&tipo_hab="+hab_tipo+"&fecha_in="+in_fecha;
    // AJAX code to submit form.
	$.ajax
	(
		{
			type: "POST",
			url: "http://192.168.0.105/reservas.php",
			data: vars,
			cache: false,
			success: function(resp) 
			{
				if(resp==0)
				{
					alert("Hubo un problema con su reserva, por favor intente nuevamente.");
				}
				else
				{
					//$("#status").html(resp);
					var currentLocation = String(window.location);
					var l =parseInt(currentLocation.length)-19;
					var host = currentLocation.substr(0,l);
					//alert(host);
					window.location = host +'/web_reservado.html?reserva=' + resp;
				}			
			}
		}
	);
}

function postCotizar()
{
	var _continue = checkValues();
	if (_continue==1)
	{
		alert("Por favor ingrese todos los parámetros del formulario!");
		return;
	}
	select2 = document.getElementById("sel_tipo_hab");
	//alert(select2.options[select2.selectedIndex].value);
	if(select2.options[select2.selectedIndex].value>0)
	{
		$.ajax
		(
			{
				type: "GET",
				url: "http://192.168.0.105/reservas.php?metodo=getrooms",
				data: 0,
				cache: false,
				success: function(resp) 
				{
					console.log("requesting");
					var obj = JSON.parse(resp);
					$("#costo").html(setValue(obj));
					$("#btn2").prop("disabled",false);
				}
			}
		);
	}
	else
	{
		alert("hab no select");
	}
}

function setValue(json_resp)
{
	var cost_hab_simp = parseInt(json_resp[0].room_price);
	var cost_hab_dob = parseInt(json_resp[1].room_price);
	//alert(cost_hab_dob);
	var nmrdias=parseInt(document.getElementById("cant_dias").value);
	var cot= 0;
	//alert(nmrdias);
	var select2 = document.getElementById("sel_tipo_hab");
	var hab_val=select2.options[select2.selectedIndex].value;
	//alert(hab_val);
	if (hab_val==1)
	{
		cot=cost_hab_simp*1;
	} 
	else if (hab_val==2)
	{
		cot=cost_hab_simp*2;
	} 
	else if (hab_val==3)
	{
		cot=cost_hab_dob*1;
	}
	else if (hab_val==4)
	{
		cot=cost_hab_simp*3;
	}
	else if (hab_val==5)
	{
		cot=cost_hab_simp*2 + cost_hab_dob*1;
	}
	else
	{
		return 0;
	}
	cot=cot*nmrdias;
	//alert(cot);
	//document.getElementById("costo").text=cot;
	return cot;
}

function setList()
{
	var select1 = document.getElementById("sel_cant_pers");
	var opt = select1.options[select1.selectedIndex].text;
	$("#sel_tipo_hab").empty();
	var select2 = document.getElementById("sel_tipo_hab");
	if(opt==1)
	{
		select2.options[select2.options.length] = new Option('# Habitaciones:', 0);
		select2.options[select2.options.length] = new Option('Hab. Simple', 1);	
	} 
	else if (opt==2)
	{
		select2.options[select2.options.length] = new Option('# Habitaciones:', 0);
		select2.options[select2.options.length] = new Option('Hab. Simple x 2', 2);	
		select2.options[select2.options.length] = new Option('Hab. Doble', 3);	
	}
	else if (opt ==3)
	{
		select2.options[select2.options.length] = new Option('# Habitaciones:', 0);
		select2.options[select2.options.length] = new Option('Hab. Simple x 3', 4);	
		select2.options[select2.options.length] = new Option('Hab. Simple + Hab. Doble', 5);	
	} 
	else
	{
		select2.options[select2.options.length] = new Option('# Habitaciones:', 0);
	}
}