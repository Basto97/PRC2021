<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    
    <xsl:output method="text" encoding="UTF-8" indent="yes"/>
    
    <xsl:template match="author | editor">
        #-------------------------------------------
        :<xsl:value-of select="@id"/> rdf:type owl:NamedIndividual,
        :Autor ;
        :temNome "<xsl:value-of  select="current()"/>" .
        #-------------------------------------------
    </xsl:template>
    
    <xsl:template match="inproceedings">
        #-------------------------------------------
        :<xsl:value-of select="@id"/> rdf:type owl:NamedIndividual,
        :Inproceedings ;
        :temAutor 
        <xsl:for-each select="author-ref | editor-ref| author">
            :<xsl:value-of select="@authorid | @id"/>  <xsl:if test="not(position() = last())" > , </xsl:if>
        </xsl:for-each>;
        
        :temAdress "<xsl:value-of select="address"/>" ;
        :temAno <xsl:value-of select="year"/> ;
        :temBookTitle "<xsl:value-of select="booktitle"/>" ;
        :temDOI "<xsl:value-of select="doi"/>" ;
        :temMes "<xsl:value-of select="month"/>" ;
        :temTItle "<xsl:value-of select="title"/>" .
        #-------------------------------------------
    </xsl:template>
    
    
    <xsl:template match="proceedings">
        #-------------------------------------------
        :<xsl:value-of select="@id"/> rdf:type owl:NamedIndividual ,
        :Proceedings ;
        :temAutor  
        <xsl:for-each select="author-ref | editor-ref| author">
            :<xsl:value-of select="@authorid | @id"/>  <xsl:if test="not(position() = last())" > , </xsl:if>
        </xsl:for-each>;
        :temAdress "<xsl:value-of select="address"/>"  ;
        :temAno <xsl:value-of select="year"/> ;
        :temISSN "<xsl:value-of select="isbn"/>" ;
        :temDOI "<xsl:value-of select="doi"/>" ;
        :temMes "<xsl:value-of select="month"/>" ;
        :temTItle "<xsl:value-of select="title"/>" .
        #-------------------------------------------
    </xsl:template>
    
    <xsl:template match="article">
        #-------------------------------------------
        :<xsl:value-of select="@id"/> rdf:type owl:NamedIndividual ,
        :Acticle ;
        :temAutor  
        <xsl:for-each select="author-ref | editor-ref| author">
            :<xsl:value-of select="@authorid | @id"/>  <xsl:if test="not(position() = last())" > , </xsl:if>
        </xsl:for-each>;
        :temJournal "<xsl:value-of select="journal"/>"  ;
        :temTItle "<xsl:value-of select="title"/>" ;
        :temISSN "<xsl:value-of select="isbn | issn"/>" ;
        :temNumber "<xsl:value-of select="number"/>" ;
        :temAno <xsl:value-of select="year"/> ;
        :temDOI "<xsl:value-of select="doi"/>" ;
        :temMes "<xsl:value-of select="month"/>" .
        #-------------------------------------------
    </xsl:template>
    
    <xsl:template match="book">
        #-------------------------------------------
        :<xsl:value-of select="@id"/> rdf:type owl:NamedIndividual ,
        :Livro ;
        :temAutor  
        <xsl:for-each select="author-ref | editor-ref| author">
            :<xsl:value-of select="@authorid | @id"/>  <xsl:if test="not(position() = last())" > , </xsl:if>
        </xsl:for-each>;
        :temTItle "<xsl:value-of select="title"/>" ;
        :temPublisher "<xsl:value-of select="publisher"/>" ;
        :temAno <xsl:value-of select="year"/> ;
        :temMes "<xsl:value-of select="month"/>" ;
        :temAdress "<xsl:value-of select="address"/>"  .
        #-------------------------------------------
    </xsl:template>
 
    <xsl:template match="misc">
        #-------------------------------------------
        :<xsl:value-of select="@id"/> rdf:type owl:NamedIndividual ,
        :Misc ;
        :temAutor  
        <xsl:for-each select="author-ref | editor-ref| author">
            :<xsl:value-of select="@authorid | @id"/>  <xsl:if test="not(position() = last())" > , </xsl:if>
        </xsl:for-each>;
        :temTItle "<xsl:value-of select="title"/>" ;
        :howPublished "<xsl:value-of select="howpublished"/>" ;
        :temAno <xsl:value-of select="year"/> ;  
        :temDOI "<xsl:value-of select="doi"/>" .
        #-------------------------------------------
    </xsl:template>
    

    
</xsl:stylesheet>