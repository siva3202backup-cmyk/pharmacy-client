pipeline {
    agent any

    tools {
        nodejs 'NodeJS-22'
    }

    environment {
        IMAGE_NAME = "pharmacy-client"
        CONTAINER_NAME = "pharmacy-client-container"
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build Angular') {
            steps {
                bat 'npm run build -- --configuration production'
            }
        }

        stage('Remove Existing Container') {
            steps {
                bat '''
                docker stop %CONTAINER_NAME% || exit /b 0
                docker rm %CONTAINER_NAME% || exit /b 0
                '''
            }
        }

        stage('Remove Existing Image') {
            steps {
                bat '''
                docker rmi %IMAGE_NAME%:%IMAGE_TAG% || exit /b 0
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                bat '''
                docker build -t %IMAGE_NAME%:%IMAGE_TAG% .
                '''
            }
        }

        stage('Run Docker Container') {
            steps {
                bat '''
                docker run -d --name %CONTAINER_NAME% -p 8080:80 %IMAGE_NAME%:%IMAGE_TAG%
                '''
            }
        }

        stage('Verify Container') {
            steps {
                bat 'docker ps'
            }
        }
    }

    post {
        success {
            echo "Build Successful"
            echo "Docker Image : ${IMAGE_NAME}:${BUILD_NUMBER}"
            echo "Container    : ${CONTAINER_NAME}"
        }

        failure {
            echo "Build Failed"
        }

        always {
            cleanWs()
        }
    }
}