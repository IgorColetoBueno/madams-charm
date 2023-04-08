describe("opening the application", () => {
  it("passes", () => {
    cy.intercept({
      method: "GET",
      url: "http://localhost:3000/api/product/search",
    }).as("apiGetProducts");

    cy.visit("http://localhost:3000");

    cy.wait("@apiGetProducts").then((interception) => {
      cy.get('[data-testid="product-card"]').should(
        "have.length",
        interception.response?.body.length
      );
    });
  });
});
