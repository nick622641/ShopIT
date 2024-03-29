import React from 'react'

const StructuredData = ({ title, description, thumb, image, date, categoryOne, categoryTwo, rating }) => {

    const text = description.replace(/(<([^>]+)>)/gi, "").substring(0, 155) + '...'

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": title,
        "description": text,
        "image": image,
        "thumbnailUrl": thumb,
        "datePublished": new Date(date).getFullYear(),
        "genre": "Abstract Art",
        "material": categoryOne,
        "aggregateRating": rating,
        "author": {
            "@type": "Person",
            "name": categoryOne
        }    
    }

  return (
    <script type="application/ld+json">
        {JSON.stringify(structuredData)}
    </script>
  )

}

export default StructuredData
