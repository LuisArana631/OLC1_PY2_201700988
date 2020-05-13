package main

import (
	"fmt"
	"html/template"
	"net/http"
)

func index(w http.ResponseWriter, r *http.Request) {
	template, err := template.ParseFiles("../index.html")
	if err != nil {
		fmt.Fprintf(w, "Error al cargar la página, no se encontro")
	} else {
		template.Execute(w, nil)
	}
}

func main() {
	//assets
	http.Handle("/assets/", http.StripPrefix("/assets/", http.FileServer(http.Dir("../assets/"))))
	//codemirror
	http.Handle("/codemirror-5.53.2/", http.StripPrefix("/codemirror-5.53.2/", http.FileServer(http.Dir("../codemirror-5.53.2/"))))
	//dist
	http.Handle("/dist/", http.StripPrefix("/dist/", http.FileServer(http.Dir("../dist/"))))

	http.HandleFunc("/", index)

	fmt.Println("Server up in port :8000")
	http.ListenAndServe(":8000", nil)
}
