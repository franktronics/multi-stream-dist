import NodeMediaServer from 'node-media-server'
import config from '../config/default'

const nms = new NodeMediaServer(config.rtmpServer) // Création du serveur

/*nms.on('prePublish', async (id, StreamPath, args) => {
    let stream_key = getStreamKeyFromStreamPath(StreamPath) // Récupération de la clé privée
    console.log('[Evenement]', `id=${id} chemin=${StreamPath} args=${JSON.stringify(args)}`) // Affichage de l'événement

    /*User.findOne({stream_key: stream_key}, (err, user) => {
        if (!err) {
            if (!user) {
                let session = nms.getSession(id); // Récupération de la session
                session.reject(); // Rejet de la session
            } else {
                // On vérifie que l'utilisateur est bien connecté
            }
        }
    });
//});

const getStreamKeyFromStreamPath = (path) => {
    let parts = path.split('/') // On sépare le chemin en fonction du /
    return parts[parts.length - 1] // On récupère la dernière partie du chemin
}
*/

export default nms
