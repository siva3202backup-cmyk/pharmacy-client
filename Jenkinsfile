pipeline {
  agent any
  tools { nodejs 'NodeJS-22' }
  stages {
    stage('Install') { steps { sh 'npm install' } }
    stage('Build') { steps { sh 'npm run build' } }
    stage('Docker Build') { steps { sh 'docker build -t pharmacy-client:${BUILD_NUMBER} .' } }
  }
}
