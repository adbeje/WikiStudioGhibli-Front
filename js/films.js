var element, wrapper;

const load = (response) => {
  for (let i = 0; i < 20; i = i + 2) {
    $("#cardHolder").append(
      `<div class="row pb-4">
            <div class="col-sm-6 pb-4" style="text-shadow: none!important">
                <div class="card text-dark h-100" style="background: rgba(250, 250, 250, .4);">
                <div class="card-body">
                    <h5 class="card-title">${response[i].title}</h5>
                    <p class="card-text">${response[i].description}</p>
                </div>
                <div class="card-footer text-muted">
                ${
                  response[i].director === response[i].producer
                    ? `<p>Directed & produced by: ${
                        response[i].director
                      }</p>`
                    : `<p>Directed by: ${
                        response[i].director
                      }</p>
                  <p>Produced by: ${response[i].producer}</p>`
                }
                  <p>Release date: ${response[i].release_date}</p>
                </div>
                </div>
            </div>
            <div class="col-sm-6 pb-4" style="text-shadow: none!important">
                <div class="card text-dark h-100" style="background: rgba(250, 250, 250, .4);">
                <div class="card-body">
                    <h5 class="card-title">${response[i + 1].title}</h5>
                    <p class="card-text">${response[i + 1].description}</p>
                </div>
                <div class="card-footer text-muted">
                ${
                  response[i + 1].director === response[i + 1].producer
                    ? `<p>Directed & produced by: ${
                        response[i + 1].director
                      }</p>`
                    : `<p>Directed by: ${
                        response[i + 1].director
                      }</p>
                  <p>Produced by: ${response[i + 1].producer}</p>`
                }
                  <p>Release date: ${response[i + 1].release_date}</p>
                </div>
              </div>
                </div>
            </div>
        </div>`
    );
  }
};

const loadSearch = (response) => {
  if (!response) {
    popAlert();
    return;
  }
  cleanAlert();
  console.log("Estamos en la funcion", response);
  $("#cardHolder").empty();
  $("#cardHolder").append(
    `<div class="row pb-4">
            <div class="col-12 pb-4" style="text-shadow: none!important">
                <div class="card text-dark" style="background: rgba(250, 250, 250, .4);">
                <div class="card-body">
                    <h5 class="card-title">${response.title}</h5>
                    <p class="card-text">${response.description}</p>
                </div>
                <div class="card-footer text-muted">
                ${
                  response.director === response.producer
                    ? `<p>Directed & produced by: ${
                        response.director
                      }</p>`
                    : `<p>Directed by: ${
                        response.director
                      }</p>
                  <p>Produced by: ${response.producer}</p>`
                }
                  <p>Release date: ${response.release_date}</p>
                </div>
                </div>
            </div>
            </div>
        </div>`
  );
};

const popAlert = () => {
  if (element) return;
  var alert = document.createElement("section");
  alert.id = "form-alert";
  alert.className = "alert alert-danger text-center col-12";
  alert.innerHTML =
    "The entered parameters don't correspond to any Studio Ghibli film!";
  wrapper.insertBefore(alert, wrapper.firstChild);
};

const cleanAlert = () => {
  console.log("estoy en el clean");
  if (!element) return;
  element.remove();
};

$(window).on("load", async () => {
  try {
    films = (await axios.get("https://ghibliapi.herokuapp.com/films")).data;
    load(films);
    console.log(films);
  } catch (error) {
    console.log(err);
  }

  $("#searchSender").on("click", async () => {
    element = document.getElementById("form-alert");
    wrapper = document.getElementById("cardHolder");
    var inputVal = $("#searchInput").val();
    console.log(isNaN(inputVal));
    if (isNaN(inputVal)) {
      loadSearch(
        films.find(
          (film) => film.title.toLowerCase() === inputVal.toLowerCase()
        )
      );
    } else {
      popAlert();
    }
  });
});
