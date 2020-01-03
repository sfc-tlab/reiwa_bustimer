package main

import (
  "github.com/gin-gonic/gin"
  "bustimer/bus"
)

func main() {
  router := gin.Default()
  router.GET("/", func(c *gin.Context) {
    c.JSON(200, gin.H{
      "message": "success",
    })
  })
  router.GET("/bus", bus.GetBus)
  router.Run(":8080")
}
