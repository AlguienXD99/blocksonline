<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" indent="yes"/>
  
  <xsl:template match="/rss/channel">
    <html>
      <head>
        <title><xsl:value-of select="title"/></title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #dfdbc3;
            color: #333;
            margin: 0;
            padding: 0;
          }
          header {
            background-color: #816852;
            color: white;
            padding: 10px;
            text-align: center;
          }
          nav a {
            color: white;
            text-decoration: none;
            margin: 0 10px;
          }
          main {
            width: 80%;
            margin: 20px auto;
            background: #f5f2e4;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          footer {
            text-align: center;
            padding: 10px;
            background: #816852;
            color: white;
            bottom: 0;
            width: 100%;
          }
          .post {
            margin-bottom: 20px;
            padding: 10px;
            background: #f1f1f1;
            border-radius: 5px;
          }
          .post-title {
            font-size: 1.5em;
            font-weight: bold;
          }
          .post-description {
            font-size: 1.2em;
          }
          .post-date {
            color: gray;
            font-size: 0.9em;
          }
        </style>
      </head>
      <body>
        <header>
          <h1><xsl:value-of select="title"/></h1>
        </header>
        <main>
          <xsl:for-each select="item">
            <div class="post">
              <div class="post-title"><xsl:value-of select="title"/></div>
              <div class="post-description"><xsl:value-of select="description"/></div>
              <div class="post-date"><xsl:value-of select="pubDate"/></div>
            </div>
          </xsl:for-each>
        </main>
        <footer>
          <p>Powered by BlocksOnline</p>
        </footer>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
