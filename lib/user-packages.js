const axios = require("axios")

const PassThrough = require('stream').PassThrough;
const EventEmitter = require('events');

const uri = (user,offset) => {
    return `https://www.npmjs.com/profile/${user}/packages?offset=${offset}`;
};

class Fetcher extends EventEmitter {
    constructor(user){
        super();
        this.user = user
        this.on('fetch', this.fetch)
    }

    start(){
        this.emit('fetch',0)
    }

    fetch(offset){
        const self = this
        const url = uri(self.user,offset)

        axios(url)
        .then(res => {
            const {data} = res;

            data.objects.forEach(pkg=>self.emit('package',pkg));

            if (data.hasMore) {
                self.emit('fetch',offset+1)
            }else{
                self.emit('done')
            }
        })
        .catch(error => {
            throw error
            self.emit('error',error)
        });
    }
}

const createStream = (user) => {
    const stream = new PassThrough({objectMode:true})

    const pf = new Fetcher(user);
    pf.on('package',pkg => stream.push(pkg))
    pf.on('done',() => stream.push(null))
    pf.on('error',error => console.log(error))

    pf.start();
    return stream;
};

module.exports = {createStream}
