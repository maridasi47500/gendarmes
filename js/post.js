function table1(){
	var matable = document.getElementById("myscore");
	var usergender=document.getElementsByName("gender")[0].value;

	var userminute=Number(document.getElementsByName("minutes")[0].value);
	var usersecond=Number(document.getElementsByName("seconds")[0].value);
	var userpompe=document.getElementsByName("pompe")[0].value;
	var userabdo=document.getElementsByName("abdo")[0].value;
	console.log(usergender,userminute,usersecond,userpompe,userabdo);
	var maligne,i,y,temps,monnumero,minute,col,seconds,pompe,abdo,homme=[1,3,5],femme=[2,4,6];
	var casetemps, caseminute, casepompe,caseabdo,caseprec;
	var autrecasetemps, autrecaseabdo,autrecasepompe;
	var paspremier=false;
	var mycolumn = usergender === "F" ? femme : homme;
	var othercolumn = usergender === "F" ? homme : femme;
	console.log(usergender);
        for (y = 0;y<mycolumn.length;y++){

		paspremier=false;
	console.log(y);
	for (i = 2;i<22;i++){
	console.log(i);
		maligne =matable.children[0].children[i];
		console.log(maligne);



			col=maligne.children[mycolumn[y]]; 

		monnumero=Number(maligne.children[0].textContent);
		console.log(monnumero);
			if (y === 0){

		casetemps=maligne.children[mycolumn[y]];
		autrecasetemps=maligne.children[othercolumn[y]];
				console.log(casetemps);
		temps=casetemps.textContent;
		minute=Number(temps.split("'")[0]);
		seconds=Number(temps.split("'")[1]);
				console.log(minute,seconds);
				console.log("user",userminute,usersecond);
				console.log(!paspremier && (userminute*60 + usersecond) <= (minute*60 + seconds));
				if (!paspremier && (userminute*60 + usersecond) <= (minute*60 + seconds)){
					paspremier=true;
					casetemps.style.border="3px solid red";
				}else{
					casetemps.style.border="0px solid black";
				}
				autrecasetemps.style.border="0px solid black";
				caseprec=casetemps;
			}else if (y === 1){
		casepompe=maligne.children[mycolumn[y]];
		autrecasepompe=maligne.children[othercolumn[y]];
				console.log(casepompe);
		pompe=Number(casepompe.textContent);
				if (!paspremier && (userpompe) >= (pompe)){
					paspremier=true;
					casepompe.style.border="3px solid red";
				}else{
					casepompe.style.border="0px solid black";
				}
				autrecasepompe.style.border="0px solid black";
			}else if (y === 2){
		caseabdo=maligne.children[mycolumn[y]];
		autrecaseabdo=maligne.children[othercolumn[y]];
		abdo=Number(caseabdo.textContent);
				console.log(caseabdo);
				if (!paspremier && (userabdo) >= (abdo)){
					paspremier=true;
					caseabdo.style.border="3px solid red";
				}else{
					caseabdo.style.border="0px solid black";
				}
				autrecaseabdo.style.border="0px solid black";
			}
		}
	}
	return false;
}

$(function(){
$('form').on('submit', function () {
  if (window.filesize > 1024*5) {
    alert('max upload size is 5k');
return false;
  }
  $.ajax({
    // Your server script to process the upload
    url: $(this).attr("action"),
    type: 'POST',

    // Form data
    data: new FormData($(this)[0]),

    // Tell jQuery not to process data or worry about content-type
    // You *must* include these options!
    cache: false,
    contentType: false,
    processData: false,

    // Custom XMLHttpRequest
    success: function (data) {
	    console.log(JSON.stringify(data))
	    console.log(JSON.stringify(data.redirect))
	    if (data.redirect){
	    window.location=data.redirect;
	    }else{
	    window.location="/welcome";
	    }
},
    xhr: function () {
      var myXhr = $.ajaxSettings.xhr();
      if (myXhr.upload) {
        // For handling the progress of the upload
        myXhr.upload.addEventListener('progress', function (e) {
          if (e.lengthComputable) {
            $('progress').attr({
              value: e.loaded,
              max: e.total,
            });
          }
        }, false);
      }
      return myXhr;
    }
  });
	return false;
  });
  
});
