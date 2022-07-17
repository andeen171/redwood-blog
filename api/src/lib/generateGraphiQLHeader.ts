const generateGraphiQLHeader = () => {
  return JSON.stringify(
    {
      'auth-provider': 'dbAuth',
      cookie: 'session=U2FsdGVkX1+NtE4QnDsFrmc6Ylqe3j24wFUqyrkf3x/2IPswABN1Pd1YLmXrhIXfDsNUuTnQicxnZpr/q6UWow==',
      authorization: 'Bearer 3',
    },
    null,
    2
  )
}

console.log(generateGraphiQLHeader())

export default generateGraphiQLHeader
