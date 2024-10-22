import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  Param,
  ParseEnumPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateBlockchainDto } from './dto/create-blockchain.dto';
import { UpdateBlockchainDto } from './dto/update-blockchain.dto';

import { ClientProxy } from '@nestjs/microservices';
import {
  ApiAcceptedResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ModuleTypeEnum, NetworkCodeEnum, RoleEnum } from '../types';
import { API_SERVICES } from '../utils';
import {
  CustomApiResponse,
  MessageResponse,
} from '../utils/decorators/custom-api-response.decorator';
import { Roles } from '../utils/decorators/roles.decorator';
import { PageLimit } from '../utils/requests/page-limit.request';
import { AssetDto } from './dto/asset-model.dto';
import { BlockchainDto } from './dto/blockchain-mode.dto';
import { BlockchainQueryDto } from './dto/get-blockchain-query.dto';
import { KdxContractDto } from './dto/kdx-contract.dto';

@ApiTags('Blockchain')
@CustomApiResponse()
@ApiBearerAuth()
@Controller({ path: 'blockchain', version: '1' })
// @UseGuards(JwtGuard, RolesGuard)
export class BlockchainController {
  private readonly logger = new Logger(BlockchainController.name);
  constructor(
    @Inject(API_SERVICES.NATS_SERVICE)
    private readonly blockchainClient: ClientProxy,
  ) {}

  @Post()
  @ApiAcceptedResponse({ type: BlockchainDto })
  @Roles(RoleEnum.ADMIN)
  async create(@Body() createBlockchainDto: CreateBlockchainDto) {
    return this.blockchainClient.send(
      'iswpAdminCreateBlockchain',
      createBlockchainDto,
    );
  }

  @Get()
  @ApiOkResponse({ type: BlockchainDto })
  async findAll(@Query() query: PageLimit) {
    return this.blockchainClient.send('iswpFindAllBlockchain', query);
  }

  @Get(':id/assets')
  @ApiOkResponse({ type: AssetDto, isArray: true })
  async findAllAssets(
    @Param('id', new ParseEnumPipe(NetworkCodeEnum)) id: string,
    @Query() query: BlockchainQueryDto,
  ) {
    return this.blockchainClient.send('iswpGetAssetsInBlockchain', {
      id,
      ...query,
    });
  }

  @Get(':moduleType/contracts')
  @ApiOkResponse({ type: KdxContractDto, isArray: true })
  async getKdxContracts(
    @Param('moduleType', new ParseEnumPipe(ModuleTypeEnum)) moduleType: string,
  ) {
    return this.blockchainClient.send('iswpGetKdxContracts', {
      moduleType,
    });
  }
  @Get(':moduleType/module-assets')
  @ApiOkResponse({ type: Array<string>, isArray: true })
  async getKdxModuleAssets(
    @Param('moduleType', new ParseEnumPipe(ModuleTypeEnum)) moduleType: string,
  ) {
    return this.blockchainClient.send('iswpGetKdxModuleAssets', {
      moduleType,
    });
  }
  @Get('active')
  @ApiOkResponse({ type: BlockchainDto })
  async findAllActive(@Query() query: BlockchainQueryDto) {
    return this.blockchainClient.send('iswpFindAllActiveBlockchain', query);
  }

  @Get('single/:id')
  @ApiOkResponse({ type: BlockchainDto })
  async findOne(@Param('id', new ParseEnumPipe(NetworkCodeEnum)) id: string) {
    return this.blockchainClient.send('iswpFindBlockchainById', id);
  }

  @Patch(':id')
  @Roles(RoleEnum.ADMIN)
  @ApiOkResponse({ type: MessageResponse })
  async update(
    @Param('id') id: string,
    @Body() updateBlockchainDto: UpdateBlockchainDto,
  ) {
    return this.blockchainClient.send('iswpAdminUpdateBlockchain', {
      id,
      ...updateBlockchainDto,
    });
  }

  @Patch(':id/disable')
  @Roles(RoleEnum.ADMIN)
  @ApiOkResponse({ type: MessageResponse })
  async disableBlockchain(
    @Param('id', new ParseEnumPipe(NetworkCodeEnum)) id: string,
  ) {
    return this.blockchainClient.send('iswpAdminDisableBlockchain', id);
  }

  @Delete(':id')
  @Roles(RoleEnum.ADMIN)
  @ApiOkResponse({ type: MessageResponse })
  async remove(@Param('id', new ParseEnumPipe(NetworkCodeEnum)) id: string) {
    return this.blockchainClient.send('iswpAdminDeleteBlockchain', id);
  }
}
