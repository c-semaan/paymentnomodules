CODE_CHANGES = getGitChanges()
pipeline {
    agent {
        docker {
            image 'node:6-alpine'
            args '-p 3000:3000'
        }
    }
    parameters {
        choice(name: 'VERSION', choices: ['1.1.0','1.2.0','1.3.0'], description: '')
        booleanParam(name: 'executeTests', defaultValue: true, description: '')
    }
    environment {
        NEW_VERSION = '1.1.0'
        CI = 'true'
    }
    stages {
        stage('Build') {
            when {
                expression {
                    CODE_CHANGES == true
                }
            }
            steps {
                echo "Building the application version ${NEW_VERSION} ..."
                sh 'npm install'
            }
        }
        stage('Test') {
            when {
                expression {
                    params.executeTests
                 }
            }
            steps {
                
                echo 'Testing the build...'
                sh "chmod +x -R ${env.WORKSPACE}"
                sh './test.sh'
            }
        }
        stage('Deliver') {
            steps {
                echo "Delvering version ${params.VERSION}..."
                npm test
                sh './deliver.sh'
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
                sh './kill.sh'
            }
        }
    }
    post {
        always {
        }
        
        success {
        }
        
        failure{
        }
    }
}
