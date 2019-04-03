## Functions Test

### Introduction

Local test sample of Azure functions.

### To run test

1. Install modules

    ```shell
    npm install
    ```

2. Run tests

    ```shell
    $ npm test

        > jest
        PASS  Tests/HttpTrigger/index.test.js
        ✓ Success Test (7ms)
        ✓ ValidationException Test(name undefined) (1ms)
        ✓ ValidationException Test(age undefined) (1ms)

        Test Suites: 1 passed, 1 total
        Tests:       3 passed, 3 total
        Snapshots:   0 total
        Time:        3.539s
        Ran all test suites.
    ```
