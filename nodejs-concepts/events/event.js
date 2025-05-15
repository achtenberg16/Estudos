const Event = require("events");

class MyEvent extends Event {

}

var myEven = new MyEvent();


myEven.on("foo", () => {
    console.log("say hello 1")
})

myEven.on("foo", (name) => {
    console.log("say hello 2", name)
})


myEven.on("foo", (name, age) => {
    console.log("say hello 2", name, age)
})

myEven.on("bar", () => {
    console.log("say hello bar")
})

myEven.once("once", () => {
    console.log("say hello once")
})

 console.log(myEven.eventNames())
myEven.emit("once")
myEven.emit("once")
myEven.emit("once")
myEven.emit("foo")
myEven.emit("foo", "alessandro")
myEven.emit("foo", "alessandro", 21)
myEven.emit("bar")
myEven.emit("once")


 console.log(myEven.eventNames())