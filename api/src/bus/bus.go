package bus

import (
  "github.com/gin-gonic/gin"
)

func GetBus(c *gin.Context) {
  c.JSON(200, gin.H{
      "message": "success",
  })
}
