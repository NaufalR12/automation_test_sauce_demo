pipeline {
    agent any

    triggers {
        // Trigger the pipeline on code changes
        githubPush()
    }

    options {
        // Keep only the last 10 builds
        disableConcurrentBuilds()
        ansiColor('xterm')
        timestamps()
    }

    environment {
        // Define any environment variables here
        // For example: 
        // JAVA_HOME = '/path/to/java'
        NODE_ENV = 'test'
        JAVA_HOME = '/opt/java/openjdk'
        PATH = "${JAVA_HOME}/bin:${env.PATH}"
    }

    tools {
        // Define any tools you need here
        // For example:
        // maven 'Maven 3.6.3'
        nodejs 'nodejs'
        allure 'allure'
    }

    stages {
        stage('Checkout') {
            steps {
               checkut scm
            }
        }
        stage('Install Dependencies') {
            steps {
                dir(env.WORKSPACE) {
                    sh '''
                    echo "WORKSPACE: $(pwd)"
                    node -v
                    npm -v
                    npm ci
                    npx cypress install
                    npx cypress verify
                    echo "=== check allure plugin ==="
                    npm ls @shelex/cypress-allure-plugin || true
                    ls -la node_modules/@shelex/cypress-allure-plugin || true
                    '''
                }
            }
        }
        stage('Run Cypress Tests') {
            steps {
                sh 'npx cypress run --headless'
            }
        }
        stage('Run Cypress Tests') {
            steps {
                sh 'npx cypress run --headless'
            }
        }
        stage('Archive Artifacts ') {
            steps {
                archiveArtifacts artifacts: 'cypress/videos/**, cypress/screenshots/**', allowEmptyArchive: true
        }
    }
}

post {
    always {
        allure includeProperties: false, jdk: 'temurin21', results: [[path: 'allure-results']]
        cleanWs()
    }
    failure {
        echo 'cypress tests failed!'
    }
    success {
        echo 'cypress tests passed!'
    }
}