const blogDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
})

export const formatBlogDate = (value: string) => blogDateFormatter.format(new Date(value))
