export default {
async fetch(request, env) {

const url = new URL(request.url)

if(url.pathname === "/get"){

const ip = request.headers.get("CF-Connecting-IP")

const device = url.searchParams.get("device")

if(!device) return new Response("no device")

const id = ip+"-"+device

let saved = await env.KEYS.get(id)

if(saved) return new Response(saved)

let expire = Date.now()+86400000

let key = "FREE-"+Math.random().toString(36).substring(2,10)+"-"+expire

await env.KEYS.put(id,key,{expirationTtl:86400})

return new Response(key)

}

}
}