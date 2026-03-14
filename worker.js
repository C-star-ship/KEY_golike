export default {
async fetch(request, env) {

const url = new URL(request.url)

if(url.pathname === "/key"){

const ip = request.headers.get("CF-Connecting-IP")
const device = request.headers.get("User-Agent")

const id = ip + device

let saved = await env.KEYS.get(id)

if(saved){
return new Response(saved)
}

let expire = Date.now() + 86400000

let key = "FREE-" + Math.random().toString(36).substring(2,10).toUpperCase() + "-" + expire

await env.KEYS.put(id,key,{expirationTtl:86400})

return new Response(key)

}

return new Response("Key API")
}
}