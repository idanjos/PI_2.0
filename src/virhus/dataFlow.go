package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"math/rand"
	"net/http"
	"os"
	"time"
)

const sourceData string = "./src/sourceData/"

var neutralFiles []string = []string{"ID10_Sessao1_N"}
var happyFiles []string = []string{"ID10_Sessao1_H"}
var fearFiles []string = []string{"ID10_Sessao1_F"}

type ReqData struct {
	Emotion string
	Size    int
	Offset  int
}

func (r ReqData) GetData() []string {

	var output []string = []string{}
	var fileHandle *os.File
	switch r.Emotion {
	case "neutral":
		fileHandle, _ = os.Open(sourceData + r.Emotion + "/" + neutralFiles[0])
	case "fear":
		fileHandle, _ = os.Open(sourceData + r.Emotion + "/" + fearFiles[0])
	case "happy":
		fileHandle, _ = os.Open(sourceData + r.Emotion + "/" + happyFiles[0])
	}

	//fileHandle, _ := os.Open(sourceData + r.Emotion)
	log.Println(r)
	defer fileHandle.Close()
	fileScanner := bufio.NewScanner(fileHandle)
	line := 0
	for fileScanner.Scan() {
		if line == (r.Size * r.Offset) {
			for i := 0; i < r.Size; i++ {
				fileScanner.Scan()
				output = append(output, fileScanner.Text())
			}
			return output
		}
		line++

	}
	//fmt.Println(output)
	return output

}

func newValue() string {
	var min float64 = -1
	var max float64 = 1
	x := rand.Float64()*(max-min) + min
	return fmt.Sprintf("%f", x)
}

func getData(w http.ResponseWriter, r *http.Request) {
	//Verify auth
	//get from Database
	defer timer(time.Now())
	var s ReqData
	body, err := ioutil.ReadAll(r.Body)
	json.Unmarshal(body, &s)
	if err != nil {
		internalError(w)
		return
	}

	output, _ := json.Marshal(s.GetData())
	w.Write([]byte(output))
}
