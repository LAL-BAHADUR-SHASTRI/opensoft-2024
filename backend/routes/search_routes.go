package routes

import (
	"encoding/json"
	"log"
	"net/http"
	"opensoft_2024/utils"
	"strings"

	"github.com/gin-gonic/gin"
)

func SearchServiceRouter(r *gin.Engine) {
	search := r.Group("/search")
	{
		search.GET("/semantic/:searchTerm", Semantic)
		search.GET("/fuzzy/:searchTerm", Fuzzy)
		search.GET("/autocomplete/:searchTerm", Autocomplete)
	}
}

func Semantic(c *gin.Context) {
	searchTerm := c.Param("searchTerm")
	// Convert or normalize the searchTerm
	normalizedSearchTerm := strings.TrimSpace(strings.ToLower(searchTerm))

	semanticResults, err := utils.SemanticSearch(embedded_movieCollection, normalizedSearchTerm)
	if err != nil {
		log.Println("Error with semantic search:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error with semantic search"})
		return
	}

	results := map[string]interface{}{
		"semantic": semanticResults,
	}
	jsonResults, err := json.Marshal(results)
	if err != nil {
		log.Println("Error marshalling results to JSON:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error marshalling results"})
		return
	}

	c.Data(http.StatusOK, "application/json", jsonResults)
}

func Fuzzy(c *gin.Context) {
	searchTerm := c.Param("searchTerm")
	// Convert or normalize the searchTerm
	normalizedSearchTerm := strings.TrimSpace(strings.ToLower(searchTerm))

	FuzzyResults, err := utils.FuzzySearch(movieCollection, normalizedSearchTerm)
	if err != nil {
		log.Println("Error with fuzzy search:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error with fuzzy search"})
		return
	}

	results := map[string]interface{}{
		"fuzzy": FuzzyResults,
	}
	jsonResults, err := json.Marshal(results)
	if err != nil {
		log.Println("Error marshalling results to JSON:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error marshalling results"})
		return
	}

	c.Data(http.StatusOK, "application/json", jsonResults)
}

func Autocomplete(c *gin.Context) {
	searchTerm := c.Param("searchTerm")
	// Convert or normalize the searchTerm
	normalizedSearchTerm := strings.TrimSpace(strings.ToLower(searchTerm))

	AutocompleteResults, err := utils.AutocompleteSearch(movieCollection, normalizedSearchTerm)
	if err != nil {
		log.Println("Error with autocomplete search:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error with autocomplete search"})
		return
	}

	results := map[string]interface{}{
		"autocomplete": AutocompleteResults,
	}
	jsonResults, err := json.Marshal(results)
	if err != nil {
		log.Println("Error marshalling results to JSON:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error marshalling results"})
		return
	}

	c.Data(http.StatusOK, "application/json", jsonResults)
}
