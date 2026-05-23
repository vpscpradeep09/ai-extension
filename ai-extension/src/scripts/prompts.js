/**
 * Collection of default prompts for different use cases (ICE POT Format)
 */
export const DEFAULT_PROMPTS = {
 
  /**
   * Selenium Java Page Object Prompt (No Test Class)
   */
  SELENIUM_JAVA_PAGE_ONLY: `
    Instructions:
    - Generate ONLY a Selenium Java Page Object Class (no test code).
    - Add JavaDoc for methods & class.
    - Use Selenium 2.30+ compatible imports.
    - Use meaningful method names.
    - Do NOT include explanations or test code.

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`

    Example:
    \`\`\`java
    package com.testleaf.pages;

    /**
     * Page Object for Component Page
     */
    public class ComponentPage {
        // Add methods as per the DOM
    }
    \`\`\`

    Persona:
    - Audience: Automation engineer focusing on maintainable POM structure.

    Output Format:
    - A single Java class inside a \`\`\`java\`\`\` block.

    Tone:
    - Clean, maintainable, enterprise-ready.
  `,

  /**
   * Cucumber Feature File Only Prompt
   */
  CUCUMBER_ONLY: `
    Instructions:
    - Generate ONLY a Cucumber (.feature) file.
    - Use Scenario Outline with Examples table.
    - Make sure every step is relevant to the provided DOM.
    - Do not combine multiple actions into one step.
    - Use South India realistic dataset (names, addresses, pin codes, mobile numbers).
    - Use dropdown values only from provided DOM.
    - Generate multiple scenarios if applicable.

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`

    Example:
    \`\`\`gherkin
    Feature: Login to OpenTaps

    Scenario Outline: Successful login with valid credentials
      Given I open the login page
      When I type "<username>" into the Username field
      And I type "<password>" into the Password field
      And I click the Login button
      Then I should be logged in successfully

    Examples:
      | username   | password  |
      | "testuser" | "testpass"|
      | "admin"    | "admin123"|
    \`\`\`

    Persona:
    - Audience: BDD testers who only need feature files.

    Output Format:
    - Only valid Gherkin in a \`\`\`gherkin\`\`\` block.

    Tone:
    - Clear, structured, executable.
  `,

  /**
   * Cucumber with Step Definitions
   */
  CUCUMBER_WITH_SELENIUM_JAVA_STEPS: `
    Instructions:
    - Generate BOTH:
      1. A Cucumber .feature file.
      2. A Java step definition class for selenium.
    - Do NOT include Page Object code.
    - Step defs must include WebDriver setup, explicit waits, and actual Selenium code.
    - Use Scenario Outline with Examples table (South India realistic data).

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`
    URL: \${pageUrl}

    Example:
    \`\`\`gherkin
    Feature: Login to OpenTaps

    Scenario Outline: Successful login with valid credentials
      Given I open the login page
      When I type "<username>" into the Username field
      And I type "<password>" into the Password field
      And I click the Login button
      Then I should be logged in successfully

    Examples:
      | username   | password  |
\      | "admin"    | "admin123"|
    \`\`\`

    \`\`\`java
    package com.leaftaps.stepdefs;

    import io.cucumber.java.en.*;
    import org.openqa.selenium.*;
    import org.openqa.selenium.chrome.ChromeDriver;
    import org.openqa.selenium.support.ui.*;

    public class LoginStepDefinitions {
        private WebDriver driver;
        private WebDriverWait wait;

        @io.cucumber.java.Before
        public void setUp() {
            driver = new ChromeDriver();
            wait = new WebDriverWait(driver, Duration.ofSeconds(10));
            driver.manage().window().maximize();
        }

        @io.cucumber.java.After
        public void tearDown() {
            if (driver != null) driver.quit();
        }

        @Given("I open the login page")
        public void openLoginPage() {
            driver.get("\${pageUrl}");
        }

        @When("I type {string} into the Username field")
        public void enterUsername(String username) {
            WebElement el = wait.until(ExpectedConditions.elementToBeClickable(By.id("username")));
            el.sendKeys(username);
        }

        @When("I type {string} into the Password field")
        public void enterPassword(String password) {
            WebElement el = wait.until(ExpectedConditions.elementToBeClickable(By.id("password")));
            el.sendKeys(password);
        }

        @When("I click the Login button")
        public void clickLogin() {
            driver.findElement(By.xpath("//button[contains(text(),'Login')]")).click();
        }

        @Then("I should be logged in successfully")
        public void verifyLogin() {
            WebElement success = wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("success")));
            assert success.isDisplayed();
        }
    }
    \`\`\`

    Persona:
    - Audience: QA engineers working with Cucumber & Selenium.

    Output Format:
    - Gherkin in \`\`\`gherkin\`\`\` block + Java code in \`\`\`java\`\`\` block.

    Tone:
    - Professional, executable, structured.
  `,

  /**
   * Selenium Python Page Object Prompt (No Test Class)
   */
  SELENIUM_PYTHON_PAGE_ONLY: `
    Instructions:
    - Generate ONLY a Selenium Python Page Object Class (no test code).
    - Add docstrings for methods & class.
    - Use Selenium 4+ compatible imports.
    - Use meaningful method names with snake_case convention.
    - Do NOT include explanations or test code.

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`

    Example:
    \`\`\`python
    from selenium.webdriver.common.by import By
    from selenium.webdriver.support.ui import WebDriverWait
    from selenium.webdriver.support import expected_conditions as EC

    class ComponentPage:
        """
        Page Object for Component Page
        """
        def __init__(self, driver):
            """
            Initialize the page with WebDriver instance
            """
            self.driver = driver
            self.wait = WebDriverWait(driver, 10)

        # Add methods as per the DOM
    \`\`\`

    Persona:
    - Audience: Automation engineer focusing on maintainable POM structure with Python.

    Output Format:
    - A single Python class inside a \`\`\`python\`\`\` block.

    Tone:
    - Clean, maintainable, enterprise-ready.
  `,

  /**
   * Cucumber with Selenium Python Step Definitions
   */
  CUCUMBER_WITH_SELENIUM_PYTHON_STEPS: `
    Instructions:
    - Generate BOTH:
      1. A Cucumber .feature file.
      2. A Python step definition class for selenium.
    - Do NOT include Page Object code.
    - Step defs must include WebDriver setup, explicit waits, and actual Selenium code.
    - Use Scenario Outline with Examples table (South India realistic data).

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`
    URL: \${pageUrl}

    Example:
    \`\`\`gherkin
    Feature: Login to Application

    Scenario Outline: Successful login with valid credentials
      Given I open the login page
      When I type "<username>" into the Username field
      And I type "<password>" into the Password field
      And I click the Login button
      Then I should be logged in successfully

    Examples:
      | username   | password  |
      | "admin"    | "admin123"|
    \`\`\`

    \`\`\`python
    from behave import given, when, then
    from selenium import webdriver
    from selenium.webdriver.common.by import By
    from selenium.webdriver.support.ui import WebDriverWait
    from selenium.webdriver.support import expected_conditions as EC

    class LoginStepDefinitions:
        def __init__(self):
            self.driver = None
            self.wait = None

        @given('I open the login page')
        def open_login_page(self):
            self.driver = webdriver.Chrome()
            self.wait = WebDriverWait(self.driver, 10)
            self.driver.get("\${pageUrl}")
            self.driver.maximize_window()

        @when('I type "{username}" into the Username field')
        def enter_username(self, username):
            element = self.wait.until(EC.element_to_be_clickable((By.ID, "username")))
            element.send_keys(username)

        @when('I type "{password}" into the Password field')
        def enter_password(self, password):
            element = self.wait.until(EC.element_to_be_clickable((By.ID, "password")))
            element.send_keys(password)

        @when('I click the Login button')
        def click_login(self):
            self.driver.find_element(By.XPATH, "//button[contains(text(),'Login')]").click()

        @then('I should be logged in successfully')
        def verify_login(self):
            success = self.wait.until(EC.visibility_of_element_located((By.CLASS_NAME, "success")))
            assert success.is_displayed()

        def teardown(self):
            if self.driver:
                self.driver.quit()
    \`\`\`

    Persona:
    - Audience: QA engineers working with Cucumber & Selenium in Python.

    Output Format:
    - Gherkin in \`\`\`gherkin\`\`\` block + Python code in \`\`\`python\`\`\` block.

    Tone:
    - Professional, executable, structured.
  `,

  /**
   * Playwright TypeScript Page Object Prompt (No Test Class)
   */
  PLAYWRIGHT_TS_PAGE_ONLY: `
    Instructions:
    - Generate ONLY a Playwright TypeScript Page Object Class (no test code).
    - Add JSDoc for methods & class.
    - Use Playwright 1.40+ compatible imports.
    - Use meaningful method names.
    - Do NOT include explanations or test code.

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`

    Example:
    \`\`\`typescript
    import { Page, Locator } from '@playwright/test';

    /**
     * Page Object for Component Page
     */
    export class ComponentPage {
      readonly page: Page;

      constructor(page: Page) {
        this.page = page;
      }

      // Add methods as per the DOM
    }
    \`\`\`

    Persona:
    - Audience: Automation engineer focusing on maintainable POM structure with Playwright.

    Output Format:
    - A single TypeScript class inside a \`\`\`typescript\`\`\` block.

    Tone:
    - Clean, maintainable, enterprise-ready.
  `,

  /**
   * Cucumber with Playwright TypeScript Step Definitions
   */
  CUCUMBER_WITH_PLAYWRIGHT_TS_STEPS: `
    Instructions:
    - Generate BOTH:
      1. A Cucumber .feature file.
      2. A TypeScript step definition class for Playwright.
    - Do NOT include Page Object code.
    - Step defs must include Playwright setup, page fixture, and actual Playwright code.
    - Use Scenario Outline with Examples table (South India realistic data).

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`
    URL: \${pageUrl}

    Example:
    \`\`\`gherkin
    Feature: Login to Application

    Scenario Outline: Successful login with valid credentials
      Given I open the login page
      When I type "<username>" into the Username field
      And I type "<password>" into the Password field
      And I click the Login button
      Then I should be logged in successfully

    Examples:
      | username   | password  |
      | "admin"    | "admin123"|
    \`\`\`

    \`\`\`typescript
    import { test, expect, Page } from '@playwright/test';

    test.describe('Login Feature', () => {
      let page: Page;

      test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto('\${pageUrl}');
      });

      test.afterAll(async () => {
        await page.close();
      });

      test('Successful login with valid credentials', async () => {
        // Step: I open the login page
        await page.goto('\${pageUrl}');

        // Step: I type username
        await page.fill('#username', 'admin');

        // Step: I type password
        await page.fill('#password', 'admin123');

        // Step: I click login
        await page.click('button:has-text("Login")');

        // Step: I should be logged in
        await expect(page.locator('.success')).toBeVisible();
      });
    });
    \`\`\`

    Persona:
    - Audience: QA engineers working with Playwright & BDD.

    Output Format:
    - Gherkin in \`\`\`gherkin\`\`\` block + TypeScript code in \`\`\`typescript\`\`\` block.

    Tone:
    - Professional, executable, structured.
  `,

  /**
   * Selenium Java Test Scripts (Manual Test Cases)
   * Maximum 10 test cases covering positive, negative, and edge cases
   */
  SELENIUM_JAVA_TEST_SCRIPTS: `
    Instructions:
    - Generate ONLY manual test cases in a clear, readable format (NOT automation scripts).
    - Create a maximum of 10 test cases with the following distribution:
      * 30% Positive scenarios (valid inputs, happy path)
      * 40% Negative scenarios (invalid inputs, error handling)
      * 30% Edge cases (boundary conditions, empty fields, special characters)
    - Each test case should have: Test Case ID, Title, Preconditions, Steps, Expected Result, and Notes.
    - Use Gherkin-style format for clarity.
    - Do NOT include Java code or automation scripts.
    - Use realistic South India data (names, addresses, phone numbers).
    - Reference elements from the provided DOM by their ID, class, or xpath.

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`
    URL: \${pageUrl}

    Example Output Format:
    \`\`\`
    TEST CASE 01 - Successful Login [POSITIVE]
    Title: User can login with valid credentials
    Preconditions: Application is open, user is on login page
    Steps:
      1. Enter username "rajesh.kumar" in Username field
      2. Enter password "SecurePass123" in Password field
      3. Click the Login button
    Expected Result: User is logged in successfully and redirected to dashboard
    Notes: Test with valid credentials only

    TEST CASE 02 - Login with Empty Username [NEGATIVE]
    Title: System shows error when username is empty
    Preconditions: Application is open, user is on login page
    Steps:
      1. Leave Username field empty
      2. Enter password "SecurePass123" in Password field
      3. Click the Login button
    Expected Result: Error message "Username is required" is displayed, user remains on login page
    Notes: Verify error handling for empty mandatory fields

    TEST CASE 03 - Submit with Empty Fields [EDGE CASE]
    Title: System validation when both fields are empty
    Preconditions: Application is open, user is on login page
    Steps:
      1. Leave both Username and Password fields empty
      2. Click the Login button
    Expected Result: Error message appears for each empty field, user remains on login page
    Notes: Edge case for batch validation
    \`\`\`

    Persona:
    - Audience: QA testers who need manual test cases for testing.

    Output Format:
    - Plain text format inside a \`\`\`\`\`\` block with clear test case structure.
    - Each test case should be separated by a blank line.

    Tone:
    - Clear, structured, actionable.
    - Focus on test coverage and edge cases.
  `,

  /**
   * Selenium Python Test Scripts (Manual Test Cases)
   * Maximum 10 test cases covering positive, negative, and edge cases
   */
  SELENIUM_PYTHON_TEST_SCRIPTS: `
    Instructions:
    - Generate ONLY manual test cases in a clear, readable format (NOT automation scripts).
    - Create a maximum of 10 test cases with the following distribution:
      * 30% Positive scenarios (valid inputs, happy path)
      * 40% Negative scenarios (invalid inputs, error handling)
      * 30% Edge cases (boundary conditions, empty fields, special characters)
    - Each test case should have: Test Case ID, Title, Preconditions, Steps, Expected Result, and Notes.
    - Use Gherkin-style format for clarity.
    - Do NOT include Python code or automation scripts.
    - Use realistic South India data (names, addresses, phone numbers).
    - Reference elements from the provided DOM by their ID, class, or xpath.

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`
    URL: \${pageUrl}

    Example Output Format:
    \`\`\`
    TEST CASE 01 - Successful Registration [POSITIVE]
    Title: User can register with valid information
    Preconditions: Application is open, user is on registration page
    Steps:
      1. Enter first name "Pradeep" in First Name field
      2. Enter last name "Kumar" in Last Name field
      3. Enter email "pradeep.kumar@example.com" in Email field
      4. Enter password "SecurePass@123" in Password field
      5. Click the Register button
    Expected Result: User is registered successfully, confirmation message is displayed
    Notes: Valid registration flow

    TEST CASE 02 - Register with Invalid Email [NEGATIVE]
    Title: System rejects invalid email format
    Preconditions: Application is open, user is on registration page
    Steps:
      1. Enter first name "Pradeep"
      2. Enter last name "Kumar"
      3. Enter email "invalid-email" in Email field
      4. Enter password "SecurePass@123"
      5. Click the Register button
    Expected Result: Error message "Invalid email format" is displayed, registration is not completed
    Notes: Email validation test

    TEST CASE 03 - Register with SQL Injection [NEGATIVE]
    Title: Application handles special characters safely
    Preconditions: Application is open, user is on registration page
    Steps:
      1. Enter first name "Pradeep'; DROP TABLE--"
      2. Enter last name "Kumar"
      3. Enter email "test@example.com"
      4. Enter password "SecurePass@123"
      5. Click the Register button
    Expected Result: Data is sanitized and accepted without SQL injection vulnerability
    Notes: Security edge case

    TEST CASE 04 - Register with Password Too Short [EDGE CASE]
    Title: Password validation for minimum length
    Preconditions: Application is open, user is on registration page
    Steps:
      1. Fill in valid first name, last name, and email
      2. Enter password "12345" (less than 8 characters)
      3. Click the Register button
    Expected Result: Error "Password must be at least 8 characters" is displayed
    Notes: Boundary condition for password length
    \`\`\`

    Persona:
    - Audience: QA testers who need manual test cases for testing.

    Output Format:
    - Plain text format inside a \`\`\`\`\`\` block with clear test case structure.
    - Each test case should be separated by a blank line.

    Tone:
    - Clear, structured, actionable.
    - Focus on test coverage and edge cases.
  `,

  /**
   * Playwright TypeScript Test Scripts (Manual Test Cases)
   * Maximum 10 test cases covering positive, negative, and edge cases
   */
  PLAYWRIGHT_TS_TEST_SCRIPTS: `
    Instructions:
    - Generate ONLY manual test cases in a clear, readable format (NOT automation scripts).
    - Create a maximum of 10 test cases with the following distribution:
      * 30% Positive scenarios (valid inputs, happy path)
      * 40% Negative scenarios (invalid inputs, error handling)
      * 30% Edge cases (boundary conditions, empty fields, special characters)
    - Each test case should have: Test Case ID, Title, Preconditions, Steps, Expected Result, and Notes.
    - Use Gherkin-style format for clarity.
    - Do NOT include TypeScript code or automation scripts.
    - Use realistic South India data (names, addresses, phone numbers).
    - Reference elements from the provided DOM by their ID, class, or xpath.

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`
    URL: \${pageUrl}

    Example Output Format:
    \`\`\`
    TEST CASE 01 - Add Item to Cart [POSITIVE]
    Title: User can successfully add item to shopping cart
    Preconditions: E-commerce application is open, product page is displayed
    Steps:
      1. Navigate to any product page
      2. Select quantity "2" from the quantity dropdown
      3. Select size "M" from available options
      4. Click "Add to Cart" button
    Expected Result: Product is added to cart, cart count increases, success message is shown
    Notes: Standard positive flow for e-commerce

    TEST CASE 02 - Add Item Without Selecting Size [NEGATIVE]
    Title: System prevents adding item when required attributes are missing
    Preconditions: E-commerce application is open, product page is displayed
    Steps:
      1. Navigate to product page (size is mandatory)
      2. Select quantity "1"
      3. Skip size selection
      4. Click "Add to Cart" button
    Expected Result: Error message "Please select a size" is displayed, item is not added to cart
    Notes: Mandatory field validation

    TEST CASE 03 - Add Item with Quantity Zero [EDGE CASE]
    Title: System prevents adding zero quantity items
    Preconditions: E-commerce application is open, product page is displayed
    Steps:
      1. Navigate to product page
      2. Set quantity to "0" manually
      3. Select size "L"
      4. Click "Add to Cart" button
    Expected Result: Error message displayed or quantity auto-reverts to minimum (1)
    Notes: Boundary condition for quantity

    TEST CASE 04 - Add Item with Negative Quantity [EDGE CASE]
    Title: System handles negative quantity input
    Preconditions: E-commerce application is open, product page is displayed
    Steps:
      1. Navigate to product page
      2. Attempt to enter "-5" in quantity field
      3. Select size "S"
      4. Click "Add to Cart" button
    Expected Result: Quantity field rejects negative values or auto-corrects to positive
    Notes: Input validation for numeric fields

    TEST CASE 05 - Add Out of Stock Item [NEGATIVE]
    Title: System prevents adding out-of-stock items
    Preconditions: Product is marked as "Out of Stock" on the page
    Steps:
      1. Navigate to out-of-stock product page
      2. Verify "Add to Cart" button is disabled or shows "Out of Stock" label
      3. Attempt to click the button
    Expected Result: Button is disabled/unavailable, informative message is shown
    Notes: Inventory management test
    \`\`\`

    Persona:
    - Audience: QA testers who need manual test cases for testing.

    Output Format:
    - Plain text format inside a \`\`\`\`\`\` block with clear test case structure.
    - Each test case should be separated by a blank line.

    Tone:
    - Clear, structured, actionable.
    - Focus on test coverage and edge cases.
  `
};

/**
 * Helper function to escape code blocks in prompts
 */
function escapeCodeBlocks(text) {
  return text.replace(/```/g, '\\`\\`\\`');
}

/**
 * Function to fill template variables in a prompt
 */
export function getPrompt(promptKey, variables = {}) {
  let prompt = DEFAULT_PROMPTS[promptKey];
  if (!prompt) {
    throw new Error(`Prompt not found: ${promptKey}`);
  }

  Object.entries(variables).forEach(([k, v]) => {
    const regex = new RegExp(`\\$\\{${k}\\}`, 'g');
    prompt = prompt.replace(regex, v);
  });

  return prompt.trim();
}

export const CODE_GENERATOR_TYPES = {
  SELENIUM_JAVA_PAGE_ONLY: 'Selenium-Java-Page-Only',
  SELENIUM_PYTHON_PAGE_ONLY: 'Selenium-Python-Page-Only',
  PLAYWRIGHT_TS_PAGE_ONLY: 'Playwright-TypeScript-Page-Only',
  CUCUMBER_ONLY: 'Cucumber-Only',
  CUCUMBER_WITH_SELENIUM_JAVA_STEPS: 'Cucumber-With-Selenium-Java-Steps',
  CUCUMBER_WITH_SELENIUM_PYTHON_STEPS: 'Cucumber-With-Selenium-Python-Steps',
  CUCUMBER_WITH_PLAYWRIGHT_TS_STEPS: 'Cucumber-With-Playwright-TypeScript-Steps',
  SELENIUM_JAVA_TEST_SCRIPTS: 'Selenium-Java-Test-Scripts',
  SELENIUM_PYTHON_TEST_SCRIPTS: 'Selenium-Python-Test-Scripts',
  PLAYWRIGHT_TS_TEST_SCRIPTS: 'Playwright-TypeScript-Test-Scripts',
};
