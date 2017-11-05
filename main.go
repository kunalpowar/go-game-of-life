package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
)

var (
	multiverse map[int]*universe
	upgrader   = websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
	}
)

func main() {
	multiverse = make(map[int]*universe)

	r := mux.NewRouter()
	a := r.PathPrefix("/api").Subrouter()

	a.HandleFunc("/init", initialise).Methods("POST")

	r.PathPrefix("/ws").HandlerFunc(serveWs)
	r.PathPrefix("/").Handler(http.FileServer(http.Dir("web/dist")))

	if err := http.ListenAndServe("0.0.0.0:8090", r); err != nil {
		panic(err)
	}
}

func initialise(w http.ResponseWriter, r *http.Request) {
	var input struct {
		Size int `json:"size"`
	}

	defer r.Body.Close()

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		log.Printf("api: could not decode data: %v", r.Body, err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	u := newUniverse(input.Size)
	multiverse[1] = &u
}

func serveWs(w http.ResponseWriter, r *http.Request) {
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		if _, ok := err.(websocket.HandshakeError); !ok {
			log.Println(err)
		}
		return
	}

	go sendUpdates(ws)
}

func sendUpdates(ws *websocket.Conn) {
	for {
		_, _, err := ws.ReadMessage()
		if err != nil {
			log.Printf("could not read from ws: %v", err)
			break
		}

		a := struct {
			x, y int
		}{1, 2}
		if err := ws.WriteJSON(&a); err != nil {
			log.Printf("could not write to ws: %v", err)
			break
		}
	}
}
