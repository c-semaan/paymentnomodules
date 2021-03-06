CODE_CHANGES = getGitChanges()
pipeline {
    agent {
        docker {
            image 'node:6-alpine'
            args '-p 3000:3000'
        }
    }
    parameters {
        choice(name: 'VERSION', choices: ['1.1.0', '1.2.0', '1.3.0'], description: '')
        booleanParam(name: 'executeTests', defaultValue: true, description: '')
    }
    environment {
        NEW_VERSION = '1.1.0'
        CI = 'true'
    }
    stages {
        CODE_CHANGES = getGitChanges()
        stage('Build') {
            when {
                expression {
                    CODE_CHANGES == true
                }
            }
            steps {
                echo "Building the application version ${NEW_VERSION} ..."
                sh 'npm install'
                sh 'exit 0'
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
                sh 'npm test'
                try {
                    sh 'npm test' 
               
                } catch (Exception err) {
                currentBuild.result = 'UNSTABLE' // Я могу либо здесь полностью провалить сборку с этим.
                sh "exit 1" // Это помечает код как неудачный.
                }
                
                                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    sh "exit 1"
                }
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
   
}
