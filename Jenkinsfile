pipeline{
    agent any

    tools{
        nodejs "Node14"
    }

    stages{
        stage("Install dependencies"){
            steps{
                sh "npm install -g newman"
                sh "npm ci"
            }
        }
        stage("Static Tests"){
            steps{
                sh "npm run test"
            }
        }
        stage("Build"){
            steps{
                sh "node api/index.js"
            }
        }
        stage("Newman"){
            steps{
                sh "npm run newman"
            }
        }
    }
}
