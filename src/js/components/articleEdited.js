module.exports = (function(){
	var box=document.getElementById("article");
	box.ondragover=function (e){
		e.preventDefault();
	}
	box.ondrop=function (e){
		e.preventDefault();
		var f=e.dataTransfer.files[0];
		var fr=new FileReader();
		fr.readAsDataURL(f);
		fr.onload=function (e){
			console.log(e);
			var Url=this.result;
			box.innerHTML+='<img src="'+Url+'" alt="">';
			console.log(Url);
		}
	}
})();