export function ReviewsDeteil({
  author, text, rating,
}) {
  return (
    <div className="d-flex flex-derection-column" style={{ position: 'relative' }}>
      <table style={{ width: '100%' }}>
        <td style={{ width: '80%', padding: '8px', margin: '0' }}>
          <tr>
            Автор:
            {' '}
            {' '}
            <span style={{ fontWeight: 'bold' }}>{author}</span>
          </tr>
          <tr>
            Отзыв:
            {' '}
            {' '}
            <span style={{ fontWeight: 'bold' }}>{text}</span>
          </tr>
        </td>
        <td style={{ width: '20%' }}>
          <tr>
            Рейтинг:
            {' '}
            <span style={{ fontWeight: 'bold' }}>{rating}</span>
          </tr>
        </td>

      </table>

    </div>

  )
}
