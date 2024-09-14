USE [TEST_DB]
GO
/****** Object:  Table [dbo].[TBL_TEST_FORM]    Script Date: 25-07-2024 18:09:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBL_TEST_FORM](
	[ID] [int] NOT NULL,
	[ITEMID] [int] NOT NULL,
	[Name] [varchar](100) NOT NULL,
	[Price] [numeric](10, 2) NOT NULL,
	[Tax] [numeric](10, 2) NOT NULL,
	[Qty] [numeric](10, 2) NOT NULL,
	[Amount] [numeric](10, 2) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[SP_TEST_CRUD]    Script Date: 25-07-2024 18:09:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[SP_TEST_CRUD](
	@Mode varchar(50),
	@ID INT =NULL,
	@Name varchar(100)=null,
	@ItemID INT =NULL,
	@Price numeric(10,2)=null,
	@Tax numeric(10,2)=null,
	@Qty numeric(10,2)=null,
	@Amount numeric(10,2)=null,
	@MaxID int=null
)
as 
begin
begin tran

if(@Mode='INSERT')
BEGIN
	SELECT @MaxID=ISNULL(MAX(ID),0)+1 FROM TBL_TEST_FORM(NOLOCK)
	SELECT @ItemID='1000'+@MaxID
	INSERT INTO TBL_TEST_FORM(ID,ItemID,Name,Price,Tax,Qty,Amount)
	values(@MaxID,@ItemID,@Name ,@Price,@Tax,@Qty,@Amount)
END

IF(@Mode='LIST')
BEGIN 
	SELECT
	ROW_NUMBER() OVER(ORDER BY ID,ItemID) as Sno,
	ID,ITEMID,Name,Price,Tax,Qty,Amount FROM TBL_TEST_FORM(NOLOCK)
END
IF(@Mode='GETBYID')
BEGIN 
	SELECT
	ROW_NUMBER() OVER(ORDER BY ID) as Sno,
	ID,ITEMID,Name,Price,Tax,Qty,Amount FROM TBL_TEST_FORM(NOLOCK) WHERE ID=@ID
END

if(@Mode='UPDATE')
BEGIN
	UPDATE TBL_TEST_FORM SET Name=@Name,Price=@Price,Tax=@Tax,Qty=@Qty,Amount
	=@Amount where ID=@ID
END

commit tran
end
GO
