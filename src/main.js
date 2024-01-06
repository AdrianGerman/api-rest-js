const API_URL_RANDOM =
  "https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_5UT9xBpqUI9PwZ1q3zzqzQuVXSSPJtPsoTZWgncgiAM1GpeUDKOZSFG8qRnWJHhI";

const API_URL_FAVORITES =
  "https://api.thecatapi.com/v1/favourites?api_key=live_5UT9xBpqUI9PwZ1q3zzqzQuVXSSPJtPsoTZWgncgiAM1GpeUDKOZSFG8qRnWJHhI";

const spanError = document.getElementById("error");

async function loadRandomMichis() {
  const res = await fetch(API_URL_RANDOM);
  const data = await res.json();
  console.log("Random");
  console.log(data);

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status;
  } else {
    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");
    const img3 = document.getElementById("img3");
    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");
    const btn3 = document.getElementById("btn3");

    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;

    btn1.onclick = () => saveFavouriteMichis(data[0].id);
    btn2.onclick = () => saveFavouriteMichis(data[1].id);
    btn3.onclick = () => saveFavouriteMichis(data[2].id);
  }
}

async function loadFavouritesMichis() {
  const res = await fetch(API_URL_FAVORITES);
  const data = await res.json();
  console.log("Favoritos");
  console.log(data);

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    data.forEach((michi) => {
      const section = document.getElementById("favoriteMichis");
      const article = document.createElement("article");
      const img = document.createElement("img");
      const btn = document.createElement("btn");
      const btnText = document.createTextNode(
        "Sacar al michi de los favoritos"
      );

      img.src = michi.image.url;
      img.width = 150;
      btn.appendChild(btnText);
      article.appendChild(img);
      article.appendChild(btn);
      section.appendChild(article);
    });
  }
}

async function saveFavouriteMichis(id) {
  const res = await fetch(API_URL_FAVORITES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image_id: id,
    }),
  });
  const data = await res.json();

  console.log("Save");
  console.log(res);

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  }
}

loadRandomMichis();
loadFavouritesMichis();
