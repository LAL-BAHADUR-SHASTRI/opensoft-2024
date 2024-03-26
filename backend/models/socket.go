package models

type SockDataType string

const (
	Search SockDataType = "search"
	Click  SockDataType = "click"
)

type SockData struct {
	Type SockDataType `json:"type"`
	Msg  string       `json:"msg"`
}
