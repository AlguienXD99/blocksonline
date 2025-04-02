<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" indent="yes"/>
  
  <xsl:template match="/rss/channel">
    <html>
      <head>
        <title><xsl:value-of select="title"/></title>
        <style>
          body { font-family: Arial, sans-serif; }
          h1 { color: #2E3A8C; }
          .post { margin-bottom: 20px; padding: 10px; background: #f1f1f1; border-radius: 5px; }
          .post-title { font-size: 1.5em; font-weight: bold; }
          .post-description { font-size: 1.2em; }
          .post-date { color: gray; font-size: 0.9em; }
        </style>
      </head>
      <body>
        <h1><xsl:value-of select="title"/></h1>
        <xsl:for-each select="item">
          <div class="post">
            <div class="post-title"><xsl:value-of select="title"/></div>
            <div class="post-description"><xsl:value-of select="description"/></div>
            <div class="post-date"><xsl:value-of select="pubDate"/></div>
          </div>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
