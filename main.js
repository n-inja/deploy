const http = require('http')
const {spawn, execSync} = require('child_process')

const createHandler = require('github-webhook-handler')
const handler = createHandler({path: '/', secret: process.env.SECRET || 'test'})

const fs = require('fs')
const path = require('path')

const BASE_DIR = process.env.BASE_DIR

const server = http.createServer((req, res) => {
  handler(req, res, err => {
    res.end('Not found')
  })
}).listen(7777)

handler.on('push', event => {
  const payload = event.payload
  const branch = payload.ref.split("/").pop()
  console.log('Deploy started ...')

  if (branch === 'master') {
    execSync('sh deploy.sh', {shell: '/bin/bash'})
  }
})