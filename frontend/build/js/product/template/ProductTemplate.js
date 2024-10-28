export default class ProductsTemplate {
    static async render() {
        return `<div class="row">
        <div class="col-md-2">
          <div class="card m-2 p-4 text-center w-100">
            <img class="mx-auto d-block w-100" alt="" id="proImg" />
            <div class="card-body">
              <button
                type="reset"
                form="prods"
                class="btn btn-success mt-1"
                id="create"
                data-bs-toggle="tooltip"
                title="Nuevo"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-file-plus"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8.5 6a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V10a.5.5 0 0 0 1 0V8.5H10a.5.5 0 0 0 0-1H8.5V6z"
                  />
                  <path
                    d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"
                  />
                </svg>
              </button>
              <a
                class="btn btn-primary mt-1"
                id="update"
                data-bs-toggle="tooltip"
                title="Actualizar"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-save"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"
                  /></svg
              ></a>
              <a
                class="btn btn-danger mt-1"
                id="del"
                data-bs-toggle="tooltip"
                title="Borrar"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-file-minus"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M5.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z"
                  />
                  <path
                    d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"
                  /></svg
              ></a>
              <a
                class="btn btn-warning mt-1"
                id="favorite"
                data-bs-toggle="tooltip"
                title="Favoritos"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-heart"
                  viewBox="0 0 16 16"
                >
                  
                  <path id="heart-path" fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M14 14V5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1M8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132"/>

                </svg>
              </a>

            </div>
          </div>
        </div>

        <div class="col-md-10">
          <form class="row g-3 bg-dark-subtle m-2 p-4 rounded" id="prods">
            <div class="col-md-2">
              <label for="id" class="form-label">Id</label>
              <input type="number" class="form-control" id="id" readonly />
            </div>
            <div class="col-md-10">
              <label for="title" class="form-label">Título</label>
              <input type="text" class="form-control" id="title" />
            </div>
            <div class="col-md-12">
              <label for="description" class="form-label">Descripción</label>
              <textarea
                class="form-control"
                id="description"
                rows="5"
              ></textarea>
            </div>

            <div class="col-md-2">
              <label for="price" class="form-label">Precio</label>
              <input type="number" class="form-control" id="price" />
            </div>
            <div class="col-md-2">
              <label for="amount" class="form-label">Cantidad</label>
              <input type="text" class="form-control" id="amount" />
            </div>
            <div class="col-md-2"></div>
            <div class="col-md-2">
              <label for="discount" class="form-label">Descuento</label>
              <select id="discount" class="form-select">
                <option selected value="false">No</option>
                <option value="true">Si</option>
              </select>
            </div>
            <div class="col-md-2">
              <label for="discountper" class="form-label">%</label>
              <input type="number" class="form-control" id="discountper" />
            </div>
            <div class="col-md-2">
              <label for="discountuni" class="form-label">Unid.</label>
              <input type="text" class="form-control" id="discountuni" />
            </div>

            <div class="col-md-12">
              <label for="img" class="form-label">Imagen</label>
              <input class="form-control" type="file" id="img" />
            </div>

            <div class="col-sm-12 text-end">
              <button type="button" class="btn btn-secondary" id="prev">
                Anterior
              </button>
              <button type="button" class="btn btn-secondary" id="next">
                Siguiente
              </button>
              <button
                type="button"
                class="btn btn-primary visually-hidden"
                id="save"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>`;
    }
}
