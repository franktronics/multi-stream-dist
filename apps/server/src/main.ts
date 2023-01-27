import NodeMediaServer from 'node-media-server'
import config from './config/default'

import {spawn} from 'child_process'
import {path} from '@ffmpeg-installer/ffmpeg'
const ffmpegPath = path


const nms = new NodeMediaServer(config.rtmpServer)
nms.run()
nms.on('preConnect', (id, args) => {
  console.log('[NodeEvent on preConnect]', `id=${id} args=${JSON.stringify(args)}`);
  // let session = nms.getSession(id);
  // session.reject();
});

nms.on('postConnect', (id, args) => {
  console.log('[NodeEvent on postConnect]', `id=${id} args=${JSON.stringify(args)}`);
});

nms.on('doneConnect', (id, args) => {
  console.log('[NodeEvent on doneConnect]', `id=${id} args=${JSON.stringify(args)}`);
});

nms.on('prePublish', (id, StreamPath, args) => {
  console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
  // let session = nms.getSession(id);
  // session.reject();
});

nms.on('postPublish', (id, StreamPath, args) => {
  console.log('[NodeEvent on postPublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);

  const argument = [
    '-i',
    'rtmp://localhost/live/test',
    '-c:v',
    'copy',
    '-c:a',
    'copy',
    '-f',
    'flv',
    'rtmp://a.rtmp.youtube.com/live2/c2g3-e0h1-p8ax-ps6w-2j4u',
  ]
  let proc = spawn(ffmpegPath, argument)
  proc.stdout.on('data', function(data) {
      console.log(data);
  })
  proc.stderr.setEncoding("utf8")
  proc.stderr.on('data', function(data) {
      console.log(data);
  })
  proc.on('close', function() {
      console.log('finished');
  })


});

nms.on('donePublish', (id, StreamPath, args) => {
  console.log('[NodeEvent on donePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});

nms.on('prePlay', (id, StreamPath, args) => {
  console.log('[NodeEvent on prePlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
  // let session = nms.getSession(id);
  // session.reject();
});

nms.on('postPlay', (id, StreamPath, args) => {
  console.log('[NodeEvent on postPlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});

nms.on('donePlay', (id, StreamPath, args) => {
  console.log('[NodeEvent on donePlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});
