describe('Protractor Testing', function() {

    it('to check the page title', function() {
    browser.ignoreSynchronization = true;
    browser.get('https://ashy-pebble-0272e8b03.1.azurestaticapps.net/');
    browser.driver.getTitle().then(function(pageTitle) {
    expect(pageTitle).toEqual('KwetterFrontEnd');
    });
    });

    it('to check if login button is visible', function() {
        browser.ignoreSynchronization = true;
        browser.get('https://ashy-pebble-0272e8b03.1.azurestaticapps.net/');
        var button = element(by.buttonText('Log in'));
        expect(button.isPresent()).toBeTruthy();
    });

    it('to check if login button is visible', function() {
        browser.ignoreSynchronization = true;
        browser.get('https://ashy-pebble-0272e8b03.1.azurestaticapps.net/');
        var button = element(by.buttonText('Log out'));
        expect(button.isPresent()).toBeTruthy();
    });


    it('log in to auth0', function() {
        browser.ignoreSynchronization = true;
        browser.get('https://ashy-pebble-0272e8b03.1.azurestaticapps.net/');
        var loginButton = element(by.buttonText('Log in'));
        loginButton.click();
        var inputEmail = element(by.id('username'));
        var inputPassword = element(by.id('password'));
        var loginButtonAuth0 = element(by.buttonText('Continue'));

        inputEmail.sendKeys('test@test.com');
        inputPassword.sendKeys('Testpassword1');
        loginButtonAuth0.click();
        browser.waitForAngular();
        browser.sleep(1000);

        expect(browser.getCurrentUrl()).toBe('https://ashy-pebble-0272e8b03.1.azurestaticapps.net/profile');
        var logoutButton = element(by.buttonText('Log out'));
        logoutButton.click();

    });

    it('navigate to user page', function() {
        browser.ignoreSynchronization = true;
        browser.get('https://ashy-pebble-0272e8b03.1.azurestaticapps.net/');
        var loginButton = element(by.buttonText('Log in'));
        loginButton.click();
        var inputEmail = element(by.id('username'));
        var inputPassword = element(by.id('password'));
        var loginButtonAuth0 = element(by.buttonText('Continue'));

        inputEmail.sendKeys('test@test.com');
        inputPassword.sendKeys('Testpassword1');
        loginButtonAuth0.click();
        browser.waitForAngular();
        browser.sleep(1000);
        browser.get('https://ashy-pebble-0272e8b03.1.azurestaticapps.net/user/@rick');
        browser.sleep(1000);
        var followButton = element(by.buttonText('follow'));



        expect(followButton.isPresent()).toBeTruthy();
        var logoutButton = element(by.buttonText('Log out'));
        logoutButton.click();
    });

    it('follow user', function() {
        browser.ignoreSynchronization = true;
        browser.get('https://ashy-pebble-0272e8b03.1.azurestaticapps.net/');
        var loginButton = element(by.buttonText('Log in'));
        loginButton.click();
        var inputEmail = element(by.id('username'));
        var inputPassword = element(by.id('password'));
        var loginButtonAuth0 = element(by.buttonText('Continue'));

        inputEmail.sendKeys('test@test.com');
        inputPassword.sendKeys('Testpassword1');
        loginButtonAuth0.click();
        browser.waitForAngular();
        browser.sleep(1000);
        browser.get('https://ashy-pebble-0272e8b03.1.azurestaticapps.net/user/@rick');
        browser.sleep(1000);
        var followButton = element(by.buttonText('follow'));
        followButton.click()
        browser.sleep(1000);
        browser.get('https://ashy-pebble-0272e8b03.1.azurestaticapps.net/profile');
        browser.sleep(1000);
        var followcount = element(by.cssContainingText('mat-badge-content.mat-badge-active', '1'));

        var logoutButton = element(by.buttonText('Log out'));
        logoutButton.click();

        expect(followcount.isPresent).toBeTruthy();
    });


    it('unfollow user', function() {
        browser.ignoreSynchronization = true;
        browser.get('https://ashy-pebble-0272e8b03.1.azurestaticapps.net/');
        var loginButton = element(by.buttonText('Log in'));
        loginButton.click();
        var inputEmail = element(by.id('username'));
        var inputPassword = element(by.id('password'));
        var loginButtonAuth0 = element(by.buttonText('Continue'));

        inputEmail.sendKeys('test@test.com');
        inputPassword.sendKeys('Testpassword1');
        loginButtonAuth0.click();
        browser.waitForAngular();
        browser.sleep(1000);
        browser.get('https://ashy-pebble-0272e8b03.1.azurestaticapps.net/user/@rick');
        browser.sleep(1000);
        var unfollowButton = element(by.buttonText('following'));
        unfollowButton.click()
        browser.sleep(1000);
        browser.get('https://ashy-pebble-0272e8b03.1.azurestaticapps.net/profile');
        browser.sleep(1000);
        var followcount = element(by.cssContainingText('mat-badge-content.mat-badge-active', '0'));


        var logoutButton = element(by.buttonText('Log out'));
        logoutButton.click();

        expect(followcount.isPresent).toBeTruthy();
    });




});