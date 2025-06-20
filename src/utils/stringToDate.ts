function stringToDate(dateString: string) {
    return new Date(dateString).toLocaleDateString(
        'en-gb',
        {
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    )
}

export default stringToDate;