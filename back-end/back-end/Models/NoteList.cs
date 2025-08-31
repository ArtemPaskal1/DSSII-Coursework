namespace back_end.Models
{
    public class NoteList<T>
    {
        public int TotalItems { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
        public int PageCount { get; set; }
        public List<T>? Notes { get; set; }
    }
}
