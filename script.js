let productsCount = 1;

function addProduct() {
  const productsDiv = document.getElementById("products");
  const productDiv = document.createElement("div");
  productDiv.className = "form-group";
  productDiv.innerHTML = `
    <label for="productName">Nome do Produto:</label>
    <input type="text" class="form-control product-name" placeholder="Nome do Produto">
  `;
  productsDiv.appendChild(productDiv);

  const priceDiv = document.createElement("div");
  priceDiv.className = "form-group";
  priceDiv.innerHTML = `
    <label for="productPrice">Preço do Produto:</label>
    <input type="number" class="form-control product-price" placeholder="Preço do Produto">
  `;
  productsDiv.appendChild(priceDiv);

  productsCount++;
}

function calculate(event) {
  event.preventDefault();

  const customerNames = document.getElementsByClassName("customer-name");
  const productNames = document.getElementsByClassName("product-name");
  const productPrices = document.getElementsByClassName("product-price");

  const customers = Array.from(customerNames).map(input => input.value);
  const products = Array.from(productNames).map((input, index) => ({
    name: input.value,
    price: parseFloat(productPrices[index].value)
  }));

  const totalBill = products.reduce((total, product) => total + product.price, 0);
  const individualBill = totalBill / customers.length;

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  customers.forEach((customer, index) => {
    let serviceCharge = 0;
    if (products.some(product => product.name === "Refrigerante" && product.price > 0)) {
      serviceCharge = individualBill * 0.1;
    }

    const customerBill = individualBill + serviceCharge;

    const customerDiv = document.createElement("div");
    customerDiv.className = "customer-bill";
    customerDiv.innerHTML = `
      <h3>${customer}</h3>
      <p>Valor da conta: <span>R$ ${customerBill.toFixed(2)}</span></p>
      <p>Produtos:</p>
    `;

    const productList = document.createElement("ul");
    products.forEach(product => {
      if (product.price > 0) {
        const productItem = document.createElement("li");
        productItem.innerText = `${product.name}: R$ ${product.price.toFixed(2)}`;
        productList.appendChild(productItem);
      }
    });

    customerDiv.appendChild(productList);
    resultDiv.appendChild(customerDiv);
  });
}

const calculatorForm = document.getElementById("calculatorForm");
calculatorForm.addEventListener("submit", calculate);
