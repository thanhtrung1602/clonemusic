import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
} from '@nestjs/common';
import {CommentsService} from './comments.service';
import {CreateCommentDto} from './dto/create-comment.dto';
import {UpdateCommentDto} from './dto/update-comment.dto';
import {Public} from 'src/decorator/customize';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {
    }

    @Post('sendComment')
    @Public()
    async create(@Body() createCommentDto: CreateCommentDto) {
        return await this.commentsService.create(createCommentDto);
    }

    @Get('findAllCommentByTrack/:id')
    @Public()
    async findAll(@Param('id') id: number) {
        return await this.commentsService.findAll(id);
    }

    @Get('findAllCountCommentByTrack/:id')
    @Public()
    async findAllCount(@Param('id') id: number) {
        return await this.commentsService.findAllCount(id);
    }

    @Delete('delComment/:id')
    remove(@Param('id') id: string) {
        return this.commentsService.remove(+id);
    }
}
