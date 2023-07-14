const id=location.search.substr(4)
const { createApp } = Vue 
 createApp({
   data() {
     return {
       url: 'http://lucrech.pythonanywhere.com/productos/'+id,
       id:0,
       nombre:"",
       precio:0,
       stock:0,
       imagen:""
     }
   },
   methods: { 
     fetchData(url) { 
       fetch(url)
         .then(response => response.json())
         .then(data => {
           console.log(data)
           this.nombre=data.nombre
           this.imagen=data.imagen
            this.precio=data.precio
            this.stock=data.stock
        })
         .catch(error=>alert("Ups... se produjo un error: "+ error))
     },

     editar(){
        let producto = {
            nombre:this.nombre,
            precio: this.precio,
            stock: this.stock,
            imagen:this.imagen
        }
        var options = {
            body:JSON.stringify(producto),
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            redirect: 'follow'
        }
        fetch(this.url, options)
            .then(function () {
                alert("Registro modificado")
                window.location.href = "./productos.html"; 
            })
            .catch(err => {
                console.error(err);
                alert("Error al Grabar") 
            })      
    }
   },
   
   created() {
     this.fetchData(this.url)                                                      
   }
   
 }).mount('#app')


