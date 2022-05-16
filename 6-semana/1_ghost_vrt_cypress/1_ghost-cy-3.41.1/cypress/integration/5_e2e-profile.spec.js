const login = require('../functions/login');
const { faker } = require('@faker-js/faker');

describe("FN05 - Profile", () => {

    beforeEach(() => {
        cy.clearCookies();
        cy.visit('http://localhost:2368/ghost/');
        if (!cy.url('http://localhost:2368/ghost/#/signin')) {
            cy.get('main').then(($m) => {
                if ($m.find('form')) {
                    if ($m.find('form[id="setup"]')) {
                        login.setUpNewUser(cy, Cypress.env('siteTitle'), Cypress.env('fullName'), Cypress.env('user1Email'), Cypress.env('user1Password'));
                    }
                }
            })
        } else {
            login.loginRegistrar(cy, Cypress.env('user1Email'), Cypress.env('user1Password'));
        }
        cy.wait(3000);
    });

    it("17. Actualizar perfil datos básicos (nombre, slug, email) ", () => {
        var name = faker.name.findName();
        var userName = faker.internet.userName(name);
        var fakeEmail = faker.internet.email(name);
        cy.get('a[href="#/staff/"]').first().click();
        cy.wait(3000);
        cy.get(".apps-grid span.gh-badge.owner").first().click();
        cy.wait(3000);
        cy.screenshot("Perfil/Escenario17_1");
        cy.get("#user-name").clear();
        cy.get("#user-slug").clear();
        cy.get("#user-email").clear();
        cy.get("#user-name").type(name, { force: true });
        cy.get("#user-slug").type(userName, { force: true });
        cy.get("#user-email").type(fakeEmail, { force: true });
        cy.get(".gh-btn.gh-btn-blue.gh-btn-icon.ember-view").click();
        cy.wait(2000);
        cy.get(".gh-btn.gh-btn-blue.gh-btn-icon.gh-btn-green.ember-view").should('have.length', 1);
        cy.screenshot("Perfil/Escenario17_2");
        cy.get("#user-name").clear();
        cy.get("#user-slug").clear();
        cy.get("#user-email").clear();
        cy.get("#user-name").type("Gustavo Romero", { force: true });
        cy.get("#user-slug").type("gustavo", { force: true });
        cy.get("#user-email").type("g.romeron2@uniandes.edu.co", { force: true });
        cy.get(".gh-btn.gh-btn-blue.gh-btn-icon.ember-view").click();
        cy.wait(2000);
        cy.get(".gh-btn.gh-btn-blue.gh-btn-icon.gh-btn-green.ember-view").should('have.length', 1);
        cy.screenshot("Perfil/Escenario17_3");
    });

    it("18. Sin información en Full Name y Email ", () => {
        cy.get('a[href="#/staff/"]').first().click();
        cy.wait(3000);
        cy.get(".apps-grid span.gh-badge.owner").first().click();
        cy.wait(3000);
        cy.screenshot("Perfil/Escenario18_1");
        cy.get("#user-name").clear();
        cy.get("#user-email").clear();
        cy.screenshot("Perfil/Escenario18_2");
        cy.get(".gh-btn.gh-btn-blue.gh-btn-icon.ember-view").click();
        cy.wait(2000);
        cy.get('.gh-btn.gh-btn-blue.gh-btn-icon.gh-btn-red.ember-view').should('have.length', 1);
        cy.screenshot("Perfil/Escenario18_3");
    });

    it("19. Actualizar con nueva contraseña, verificar que se actualizó y finalmente actualizar con la contraseña original ", () => {

        var newPassword = faker.internet.password(12);
        cy.get('a[href="#/staff/"]').first().click();
        cy.wait(3000);
        cy.get(".apps-grid span.gh-badge.owner").first().click();
        cy.wait(3000);
        cy.screenshot("Perfil/Escenario19_1");
        cy.get("#user-password-old").type("1234567890!", { force: true });
        cy.get("#user-password-new").type(newPassword, { force: true });
        cy.get("#user-new-password-verification").type(newPassword, { force: true });
        cy.get(".gh-btn.gh-btn-icon.button-change-password.gh-btn-red.ember-view").click();
        cy.wait(2000);
        cy.get('.gh-notification.gh-notification-passive.ember-view').should('have.length', 1);
        cy.screenshot("Perfil/Escenario19_2");
        cy.wait(2000);
        cy.get("#user-password-old").type(newPassword, { force: true });
        cy.get("#user-password-new").type("1234567890!", { force: true });
        cy.get("#user-new-password-verification").type("1234567890!", { force: true });
        cy.get(".gh-btn.gh-btn-icon.button-change-password.gh-btn-red.ember-view").click();
        cy.wait(2000);
        cy.get('.gh-notification.gh-notification-passive.ember-view').should('have.length', 1);
        cy.screenshot("Perfil/Escenario19_3");
    });

    it("20. Actualizar contraseña con el campo old password invalido", () => {

        var newPassword = faker.internet.password(12);

        cy.get('a[href="#/staff/"]').first().click();
        cy.wait(3000);
        cy.get(".apps-grid span.gh-badge.owner").first().click();
        cy.wait(3000);
        cy.screenshot("Perfil/Escenario20_1");
        cy.get("#user-password-old").type("CONTRASEÑAINVALIDA", { force: true });
        cy.get("#user-password-new").type(newPassword, { force: true });
        cy.get("#user-new-password-verification").type(newPassword, { force: true });
        cy.screenshot("Perfil/Escenario20_2");
        cy.get(".gh-btn.gh-btn-icon.button-change-password.gh-btn-red.ember-view").click();
        cy.wait(2000);
        cy.get('.gh-alert.gh-alert-red.ember-view').should('have.length', 1);
        cy.screenshot("Perfil/Escenario20_3");

    });

});