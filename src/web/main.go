package main

import (
	"flag"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var addr = flag.String("addr", "0.0.0.0:3000", "http service address")

var upgrader = websocket.Upgrader{} // use default options

func data(w http.ResponseWriter, r *http.Request) {
	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Print("upgrade:", err)
		return
	}
	defer c.Close()
	for {
		mt, message, err := c.ReadMessage()
		if err != nil {
			log.Println("read:", err)
			break
		}
		log.Printf("recv: %s", message)
		err = c.WriteMessage(mt, []byte("hahahahas"))
		if err != nil {
			log.Println("write:", err)
			break
		}
	}
}

func main() {
	fs := http.FileServer(http.Dir("dist"))

	flag.Parse()
	http.HandleFunc("/data", data)
	http.Handle("/", fs)
	log.Fatal(http.ListenAndServe(*addr, nil))
}
