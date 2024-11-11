const fsp = require('fs').promises

// Write a newly submitted oath to the local file
export async function POST (request) {
  const filePath = 'src/app/api/oath/oaths.json'
  const data = await request.json()

  try {
    // Getting the currently recorded oaths
    const currOaths = await fsp.readFile(filePath, { encoding: 'utf8' })
    const parsedOaths = JSON.parse(currOaths)
    const updatedNumOaths = Object.keys(parsedOaths).length + 1

    // Adding the just-submitted oath to the list of oaths
    parsedOaths.push({
      oathNumber: updatedNumOaths,
      content: data.content
    })

    // Writing the updated list of oaths to the local file
    const res = await fsp.writeFile(filePath, JSON.stringify(parsedOaths))
    return Response.json({ res })
  } catch (e) {
    console.log('eeeooooowwch ', e)
  }

  // TODO I need a better return value here
  return Response.json({ data })
}
