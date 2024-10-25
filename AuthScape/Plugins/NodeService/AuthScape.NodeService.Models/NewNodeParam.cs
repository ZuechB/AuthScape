namespace AuthScape.Flows.Models
{
    public class NewNodeParam
    {
        public Guid ProjectId { get; set; }
        public string NodeType { get; set; }
        public NewNodeParamPosition Position { get; set; }
    }

    public class NewNodeParamPosition
    {
        public int x { get; set; }
        public int y { get; set; }
    }

    public enum NodeType
    {
        startNode = 1,
        writeLogNode = 2,
        colorNode = 3,
        textFieldNode = 4,
        getString = 5,
        setString = 6,
        webHookNode = 7,
        downloadStream = 8,
        readSQL = 9
    }
}